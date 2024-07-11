// src/stores/categoryStore.ts
import { apiUrl } from '@/constants/app_constants';
import ApiError from '@/utils/ApiError';
import axiosHttp from '@/utils/axios_client';
import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define the Category interface
export interface Category {
  id: number;
  title: string;
  description: string;
}

// Define the store
export const useCategoryStore = defineStore('categoryStore', () => {
  // State
  const categories = ref<Category[]>([]);
  const loading = ref(false);

  // Getters
  const getCategoryById = (id: number) => categories.value.find(category => category.id === id);

  const getAllCategories = async () => {
    try{
        loading.value = true;
        console.log(`${apiUrl}/categories`);
    
        const response = await axiosHttp.get(`${apiUrl}/categories`);
        console.log(response.data);
        
        categories.value = response.data;

        loading.value = false;
    }catch(error){
      console.log(error)
      loading.value = false;

    }
  };

  // Actions
  const addCategory = async (formData: FormData) => {
    try{
      const response = await axiosHttp.post(`${apiUrl}/categories`, formData);
      categories.value.push(response.data);
    }catch(error){
      console.log(error)
      throw ApiError.from(error as AxiosError);
    }
  };

  const updateCategory = async (updatedCategory: Category) => {
    try{
      const response = await axiosHttp.put(`${apiUrl}/categories/${updatedCategory.id}`, updatedCategory);
      const index = categories.value.findIndex(category => category.id === updatedCategory.id);
      if (index !== -1) {
        categories.value[index] = response.data;
      }
    }catch(error){
      console.log(error)
      throw ApiError.from(error as AxiosError);
    }
  };

  const deleteCategory = async (id: number) => {
    try{
      await axiosHttp.delete(`${apiUrl}/categories/${id}`);
      categories.value = categories.value.filter(category => category.id !== id);
    }catch(error){
      console.log(error)
      throw ApiError.from(error as AxiosError);
    }
  };

  // Expose store state and actions
  return {
    categories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    loading
  };
});
