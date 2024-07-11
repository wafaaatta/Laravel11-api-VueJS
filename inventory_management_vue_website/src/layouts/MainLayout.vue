<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Logo from '@/assets/logo.svg';
import { useAuthStore } from '@/stores/authentication';
import { storeToRefs } from 'pinia';
import { useSidebarStore } from '@/stores/sidebar.js';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const isSidebarVisible = ref(true);
const router = useRouter();

const sidebarStore = useSidebarStore();
const { isSidebarCollapsed } = storeToRefs(sidebarStore);

const toggleSidebar = () => {
  sidebarStore.toggleSidebar();
};


const logout = () => {
  console.log('Logging out');
  router.push('/login');
};
</script>

<template>
  <div class="layout" :class="{ 'sidebar-collapsed': isSidebarCollapsed, 'sidebar-hidden': !isSidebarVisible }">
    <aside class="sidebar" v-if="isSidebarVisible">
      <div class="sidebar-image">
        <img :src="Logo" alt="Logo" height="24" />
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/dashboard" active-class="active-link" exact>
              <i class="pi pi-home"></i>
              <span v-show="!isSidebarCollapsed">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/products" active-class="active-link">
              <i class="pi pi-shopping-cart"></i>
              <span v-show="!isSidebarCollapsed">Products</span>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/categories" active-class="active-link">
              <i class="pi pi-box"></i>
              <span v-show="!isSidebarCollapsed">Categories</span>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/orders" active-class="active-link">
              <i class="pi pi-shopping-bag"></i>
              <span v-show="!isSidebarCollapsed">Orders</span>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/reports" active-class="active-link">
              <i class="pi pi-chart-bar"></i>
              <span v-show="!isSidebarCollapsed">Reports</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="main-content">
      <header class="header">
        <div class="left-section">
          <i class="pi pi-bars" @click="toggleSidebar" />
          <img class="user-image" :src="user?.profile_photo_url" alt="User Image" />
          <span>{{ user?.name }}</span>
        </div>
        <div class="right-section">
          <router-link to="/dashboard/profile">
            <i class="pi pi-user"></i>
          </router-link>
          <router-link to="/dashboard/settings">
            <i class="pi pi-cog"></i>
          </router-link>
          <div @click="logout">
            <i class="pi pi-sign-out" style="cursor: pointer; margin-left: 24px; color: #d90429" />
          </div>
        </div>
      </header>
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background-color: #2d3e50;
  color: #fff;
  transition: width 0.3s ease-in-out;
}

.sidebar-collapsed .sidebar {
  width: 60px;
}

.sidebar-hidden .sidebar {
  visibility: hidden;
  position: absolute;
  transform: translateX(-100%);
  transition: transform 0.3s, visibility 0.3s;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  display: flex;
  align-items: center;
}

.sidebar nav ul li a {
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s;
}

.sidebar nav ul li a i {
  margin-right: 1rem;
  font-size: 1.25rem;
}

.sidebar nav ul li a:hover,
.sidebar nav ul li a.active-link {
  background-color: #4b5d76;
}

.sidebar nav ul li a span {
  display: inline;
}

.sidebar-collapsed nav ul li a span {
  display: none;
}

.sidebar-collapsed nav ul li {
  justify-content: center;
}

.sidebar-image {
  padding: 1rem;
  text-align: center;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c3041;
  color: white;
  padding: 1rem;
}

.header .left-section {
  display: flex;
  align-items: center;
}

.header .left-section i {
  cursor: pointer;
  margin-right: 1rem;
}

.user-image {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.header .right-section {
  display: flex;
  align-items: center;
}

.header .right-section i {
  margin-left: 1rem;
  cursor: pointer;
}

.content {
  background-color: #f4f4f4;
  flex-grow: 1;
  padding: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    transform: translateX(-100%);
    visibility: hidden;
  }

  .sidebar-visible .sidebar {
    transform: translateX(0);
    visibility: visible;
  }

  .header .left-section img,
  .header .left-section span {
    display: none;
  }
}
</style>
