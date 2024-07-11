<template>
    <div class="forgot-password-view">
      <div class="forgot-password-card">
        <div class="logo-container">
          <img :src="Logo" alt="Vue Logo" class="vue-logo" />
        </div>
        <h2 class="forgot-password-title">Forgot Password</h2>
        <p class="description">
          Enter your email address below and we'll send you instructions to reset your password.
        </p>
        <form @submit.prevent="handleResetRequest">
          <div class="form-field">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" required />
          </div>
          <button type="submit" class="reset-button">Send Reset Link</button>
          <router-link to="/login" class="login-link">Back to Login</router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Logo from '@/assets/logo.svg';
  
  const email = ref('');
  const router = useRouter();
  
  const handleResetRequest = () => {
    // Add your password reset logic here
    console.log('Sending reset link to', email.value);
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .forgot-password-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .forgot-password-card {
    width: 400px;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .vue-logo {
    width: 80px;
  }
  
  .forgot-password-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .description {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    color: #555;
  }
  
  .form-field {
    margin-bottom: 1rem;
  }
  
  .form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-field input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .reset-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: #fff;
    background-color: var(--primary-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .reset-button:hover {
    background-color: var(--hover-color);
  }
  
  .login-link {
    display: block;
    margin-top: 1rem;
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .login-link:hover {
    text-decoration: underline;
  }
  </style>
  