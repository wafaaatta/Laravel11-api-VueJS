<template>
    <div class="user-layout">
      <header class="header">
        <div class="logo">
          <img :src="Logo" alt="App Logo" />
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link">
            <i class="pi pi-home"></i>
          </router-link>
          <router-link to="/profile" class="nav-link">
            <i class="pi pi-user"></i>
          </router-link>
          <div @click="logout">
            <i class="pi pi-sign-out" style="cursor: pointer; color: #d90429" />
          </div>
        </nav>
      </header>
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useToast } from 'primevue/usetoast';
  import Logo from '@/assets/logo.svg';
import { useAuthStore } from '@/stores/authentication.js';
  
  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore()
  
  const logout = () => {
    authStore.logout();
    toast.add({ severity: 'success', summary: 'Logged Out', detail: 'You have been logged out.', life: 3000 });
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .user-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #114B5F; /* Admin color scheme */
    color: white;
    height: 60px;
  }
  
  .logo img {
    height: 40px;
  }
  
  .nav {
    display: flex;
    gap: 1rem;
    align-items: center
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 1rem;
    background-color: #f4f4f4;
  }
  </style>
  