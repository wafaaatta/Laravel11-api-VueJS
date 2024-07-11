// stores/authStore.ts
import { apiUrl } from '@/constants/app_constants';
import ApiError from '@/utils/ApiError';
import { getAuthenticationToken, getUserData, provideAuthentication } from '@/utils/authentication';
import axiosHttp from '@/utils/axios_client';
import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: number;
  name: string;
  email: string;
  profile_photo_url: string;
  created_at: string;
  updated_at: string;
  email_verified_at?: string;
  role: 'user' | 'admin'
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      user.value = response.data.user;
      token.value = response.data.access_token;

      provideAuthentication(token.value, user.value ,true);
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, { name, email, password });
      
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  }

  const loadAuthData = async () => {
    try {
      token.value = getAuthenticationToken()
      user.value = getUserData();
      
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    console.log('Logged out successfully');
  };

  const updateProfile = async (profileData) =>{
    try {
      const response = await axiosHttp.post(`${apiUrl}/user/update-profile`, profileData);
      console.log(response.data);
      
      user.value = response.data;
      return response.data;
    } catch (error) {
      console.log(error);
      
      throw ApiError.from(error as AxiosError);
    }
  }

  const changePassword = async (passwordData) => {
    try {
      const response = await axiosHttp.post(`${apiUrl}/user/change-password`, passwordData);
      return response.data;
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  }

  // Getters
  const getUser = computed(() => user.value);
  const getToken = computed(() => token.value);

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    getUser,
    getToken,
    loadAuthData,
    register,
    updateProfile,
    changePassword
  };
});
