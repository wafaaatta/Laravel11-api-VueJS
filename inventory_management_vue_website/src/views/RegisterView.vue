<template>
  <div class="register-view">
    <div class="register-card">
      <div class="logo-container">
        <img :src="Logo" alt="Vue Logo" class="vue-logo" />
      </div>
      <h2 class="register-title">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-field">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" type="text" required placeholder="Enter your username" />
        </div>
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
              :toggleMask="false"
              :feedback="false"
              :inputType="passwordType"
              placeholder="Enter your password"
              required
              :inputStyle="{ width: '100%' }"
              :style="{ width: '100%' }"
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
          <label for="confirmPassword">Confirm Password</label>
          <div class="password-field">
            <Password
              id="confirmPassword"
              v-model="confirmPassword"
              :toggleMask="false"
              :feedback="false"
              :inputStyle="{ width: '100%' }"
              :style="{ width: '100%' }"
              placeholder="Confirm your password"
              :inputType="confirmPasswordType"
            />
            <i
              class="pi"
              :class="confirmPasswordIcon"
              @click="toggleConfirmPasswordVisibility"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <button type="submit" class="register-button">Register</button>
        <router-link to="/login" class="login-link">Already have an account? Login</router-link>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import 'primeicons/primeicons.css';

import Logo from '@/assets/logo.svg';
import { useAuthStore } from '@/stores/authentication.js';
import { useToast } from 'primevue/usetoast';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordType = ref('password');
const confirmPasswordType = ref('password');
const passwordIcon = ref('pi-eye');
const confirmPasswordIcon = ref('pi-eye');

const router = useRouter();

const togglePasswordVisibility = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
    passwordIcon.value = 'pi-eye-slash';
  } else {
    passwordType.value = 'password';
    passwordIcon.value = 'pi-eye';
  }
};

const toggleConfirmPasswordVisibility = () => {
  if (confirmPasswordType.value === 'password') {
    confirmPasswordType.value = 'text';
    confirmPasswordIcon.value = 'pi-eye-slash';
  } else {
    confirmPasswordType.value = 'password';
    confirmPasswordIcon.value = 'pi-eye';
  }
};

const authStore = useAuthStore()
const toast = useToast();

const handleRegister = async () => {
  // Add your registration logic here
  console.log('Registering with', username.value, email.value, password.value);

  await authStore.register(username.value, email.value, password.value).then(() => {
    router.replace('/login');
  }).catch((error) => {
    toast.add({ severity: 'error', summary: 'Registration Failed', detail: error, life: 3000 });
  })
};
</script>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.register-card {
  width: 600px;
  padding: 1rem;
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

.register-title {
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

.register-button {
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

.register-button:hover {
  background-color: var(--hover-color);
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: var(--primary-color);
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
