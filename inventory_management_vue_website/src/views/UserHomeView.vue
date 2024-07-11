<template>
  <div class="user-home-view">
    <div class="welcome-container">
      <h1>Welcome, {{ userName }}</h1>
      <p class="welcome-message">{{ welcome_message }}</p>
    </div>
    
    <div class="categories">
      <h2>Check Our Categories</h2>
      <i v-if="loading" class="pi pi-spin pi-box" style="font-size: 2rem;"></i>
      <div class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card" @click="$router.push(`/categories/${category.id}/products`)">
          <div class="category-image-container">
            <img :src="storageUrl + category.image" :alt="category.title" class="category-image" style="object-fit: contain;" />
            <div class="category-overlay">
              <h3>{{ category.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authentication';
import { useUserHomeStore } from '@/stores/user_home';
import { useCategoryStore } from '@/stores/category_store';
import { storeToRefs } from 'pinia';
import { storageUrl } from '@/constants/app_constants.js';

const authStore = useAuthStore();
const userHomeStore = useUserHomeStore();
const categoryStore = useCategoryStore();

const { user } = storeToRefs(authStore);
const { welcome_message } = storeToRefs(userHomeStore);
const { categories, loading } = storeToRefs(categoryStore);
const userName = ref(user.value?.name || 'User');

onMounted(() => {
  userHomeStore.fetchWelcomeMessage();
  categoryStore.getAllCategories();
});
</script>

<style scoped>
.user-home-view {
  padding: 2rem;
  background-color: #f4f4f4;
}

.welcome-container {
  text-align: center;
  margin-bottom: 2rem;
}

.welcome-container h1 {
  font-size: 2.5rem;
  color: #114B5F;
  margin-bottom: 1rem;
}

.welcome-message {
  font-size: 1.25rem;
  color: #555;
}

.categories {
  margin-top: 2rem;
}

.categories h2 {
  font-size: 2rem;
  color: #114B5F;
  margin-bottom: 1rem;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.category-card:hover .category-image {
  transform: scale(1.1);
}

.category-image-container {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-overlay h3 {
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
}
</style>
