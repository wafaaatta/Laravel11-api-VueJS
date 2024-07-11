<template>
    <div class="reset-password-view">
      <div class="reset-password-card">
        <div class="logo-container">
          <img :src="Logo" alt="Vue Logo" class="vue-logo" />
        </div>
        <h2 class="reset-password-title">Reset Password</h2>
        <p class="description">
          Enter your new password and confirm it to reset your password.
        </p>
        <form @submit.prevent="handleResetPassword">
          <div class="form-field">
            <label for="new-password">New Password</label>
            <div class="password-field">
              <input
                id="new-password"
                v-model="newPassword"
                :type="passwordType"
                placeholder="Enter new password"
                required
              />
              <i
                class="pi"
                :class="passwordIcon"
                @click="togglePasswordVisibility"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div class="form-field">
            <label for="confirm-password">Confirm Password</label>
            <div class="password-field">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                :type="passwordType"
                placeholder="Confirm new password"
                required
              />
              <i
                class="pi"
                :class="passwordIcon"
                @click="togglePasswordVisibility"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <button type="submit" class="reset-button">Reset Password</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Logo from '@/assets/logo.svg';
  
  const newPassword = ref('');
  const confirmPassword = ref('');
  const passwordType = ref('password');
  const passwordIcon = ref('pi-eye'); // Default to eye icon
  
  const router = useRouter();
  
  const togglePasswordVisibility = () => {
    if (passwordType.value === 'password') {
      passwordType.value = 'text';
      passwordIcon.value = 'pi-eye-slash'; // Change to eye-slash icon
    } else {
      passwordType.value = 'password';
      passwordIcon.value = 'pi-eye'; // Change back to eye icon
    }
  };
  
  const handleResetPassword = () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Resetting password:', newPassword.value);
    // Add your password reset logic here
    router.push('/login'); // Navigate to login page or success page
  };
  </script>
  
  <style scoped>
  .reset-password-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .reset-password-card {
    width: 600px;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .vue-logo {
    width: 80px;
  }
  
  .reset-password-title {
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
  
  .password-field {
    position: relative;
  }
  
  .password-field input {
    width: 100%;
    padding: 0.5rem;
    padding-right: 2rem; /* Space for the eye icon */
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .password-field .pi {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #114B5F;
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
  </style>
  