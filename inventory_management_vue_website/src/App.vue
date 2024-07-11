<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/authentication.js';
import Toast from 'primevue/toast';

const authStore = useAuthStore();

onMounted(() => {
  authStore.loadAuthData();
})
</script>

<template>
  <RouterView />
  <Toast />
</template>

<style scoped>

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  background-color: darkgray;
  height: 40px;
}

nav > *{
  height: 100%;
  color: white;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
