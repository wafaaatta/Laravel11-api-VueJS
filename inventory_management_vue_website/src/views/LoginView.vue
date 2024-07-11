<template>
  <div class="login-view">
    <div class="login-card">
      <div class="logo-container">
        <img :src="Logo" alt="Vue Logo" class="vue-logo" />
      </div>
      <h2 class="login-title">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" type="email" required placeholder="Enter your email" />
        </div>
        <div class="form-field">
          <label for="password">Password</label>
          <div class="password-field">
            <Password
              id="password"
              v-model="password"
              :feedback="false"
              toggleMask
              :icon="passwordIcon"
              placeholder="Enter your password"
              required
              :inputStyle="{ width: '100%' }"
              :style="{ width: '100%' }"
            />
          </div>
        </div>
        <div class="form-options">
          <label>
            <Checkbox v-model="rememberMe" name="rememberMe" :binary="true" /> Remember Me
          </label>
          <router-link to="/forgot-password">Forgot Password?</router-link>
        </div>
        <button type="submit" class="login-button">
          Login
        </button>

        <div class="register-options">
          <router-link to="/register" class="register-link">
            Don't have an account? Register
          </router-link>
        </div>
      </form>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Logo from '@/assets/logo.svg';

// Import PrimeVue components
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

import { useAuthStore } from '@/stores/authentication';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const passwordIcon = ref('pi pi-eye'); // Default to eye icon

const router = useRouter();
const toast = useToast();

const {user} = storeToRefs(authStore);

const handleLogin = async () => {
  try {
    console.log('Logging in with', email.value, password.value, rememberMe.value);
    await authStore.login(email.value, password.value);
    toast.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome back!', life: 3000 });
    if(user.value?.role == 'admin'){
      router.push('/dashboard');
    }else{
      router.push('/');
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Login Failed', detail: error, life: 3000 });
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.vue-logo {
  width: 100px;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.password-field {
  position: relative;
}

.password-field .pi {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #114b5f;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.form-options label {
  font-size: 0.875rem;
}

.form-options a {
  font-size: 0.875rem;
  color: var(--primary-color);
  text-decoration: none;
}

.form-options a:hover {
  text-decoration: underline;
}

.login-button {
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

.login-button:hover {
  background-color: #4a6670;
}

.register-options {
  text-align: center;
  margin-top: 1rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .login-card {
    width: 90%;
  }

  .vue-logo {
    width: 80px;
  }
}

@media (max-width: 480px) {
  .login-view {
    padding: 0.5rem;
  }

  .login-card {
    width: 90%;
    padding: 1rem;
  }
}
</style>
