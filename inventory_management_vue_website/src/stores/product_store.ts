// src/stores/productStore.ts
import { apiUrl } from '@/constants/app_constants';
import ApiError from '@/utils/ApiError';
import axiosHttp from '@/utils/axios_client';
import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Category } from './category_store';

// Define the Product interface
export interface Product {
  id: number;
  name: string;
  category: Category | null;
  price: number;
  stock: number;
  description: string;
  image: File | null;
}

// Define the store
export const useProductStore = defineStore('productStore', () => {
  // State
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const api_error = ref<string | null>(null);

  // Getters
  const getProductById = (id: number) => products.value.find(product => product.id === id);

  // Actions
  const addProduct = async (formData: FormData) => {
    try{
      const response = await axiosHttp.post(`${apiUrl}/products`, formData);
      products.value.push(response.data);
    }catch(error){
      console.log(error)
      throw ApiError.from(error as AxiosError);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try{
      const response = await axiosHttp.put(`${apiUrl}/products/${updatedProduct.id}`, updatedProduct);
      const index = products.value.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        products.value[index] = response.data;
      }
    }catch(error){
      console.log(error)
      throw ApiError.from(error as AxiosError);
    }
  };

  const deleteProduct = async (id: number) => {
    try{
      await axiosHttp.delete(`${apiUrl}/products/${id}`);
      products.value = products.value.filter(product => product.id !== id);
    }catch(error){
      console.log(error)
      throw ApiError.from(error as AxiosError);
    }
  };

  const getAllProducts = async () => {
    try{
        loading.value = true;
        console.log(`${apiUrl}/products`);
    
        const response = await axiosHttp.get(`${apiUrl}/products`);
        console.log(response.data);
        
        products.value = response.data;

        loading.value = false;
    }catch(error){
      console.log(error)
      loading.value = false;
      api_error.value = (error as AxiosError).response?.data as string;
    }
  };

  const fetchProductsByCategoryId = async (categoryId: number) =>{
    try {
      products.value = []
      loading.value = true;
      const response = await axiosHttp.get(`${apiUrl}/categories/${categoryId}/products`);
      products.value  = response.data;
      loading.value = false;
    } catch (error) {
      loading.value = false;
      api_error.value = (error as AxiosError).response?.data as string;
      console.error('Failed to fetch products:', error);
    }
  }

  // Expose store state and actions
  return {
    products,
    loading,
    api_error,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProductsByCategoryId
  };
});
