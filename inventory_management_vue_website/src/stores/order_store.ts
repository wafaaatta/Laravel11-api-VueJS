// src/stores/orderStore.ts
import { apiUrl } from '@/constants/app_constants';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define the Order interface
interface Order {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

// Define the store
export const useOrderStore = defineStore('orderStore', () => {
  // State
  const orders = ref<Order[]>([]);
  const loading = ref(true);
  const api_error = ref<string | null>(null);

  // Getters
  const getOrderById = (id: number) => orders.value.find(order => order.id === id);

  // Actions
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newId = orders.value.length ? Math.max(...orders.value.map(ord => ord.id)) + 1 : 1;
    orders.value.push({ id: newId, ...order });
  };

  const updateOrder = (updatedOrder: Order) => {
    const index = orders.value.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      orders.value[index] = updatedOrder;
    }
  };

  const deleteOrder = (id: number) => {
    orders.value = orders.value.filter(order => order.id !== id);
  };

  const getAllOrders = async () => {
    try{
        loading.value = true;
        console.log(`${apiUrl}/orders`);
    
        const response = await axios.get(`${apiUrl}/orders`);
        console.log(response.data);
        
        orders.value = response.data;

        loading.value = false;
    }catch(error){
      console.log(error)
      loading.value = false;
      api_error.value = (error as AxiosError).response?.data as string;
    }
  };

  // Expose store state and actions
  return {
    orders,
    loading,
    api_error,
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
  };
});
