import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import axiosHttp from '@/utils/axios_client';

export const useUserHomeStore = defineStore('userHome', () => {
  const welcome_message = ref('')

  const fetchWelcomeMessage = async () => {
    try {
      const response = await axiosHttp.get('welcome');
      welcome_message.value = response.data.message;
    } catch (error) {
      console.error('Failed to fetch welcome message:', error);
    }
  }

  return {
    welcome_message,
    fetchWelcomeMessage
  }
});
