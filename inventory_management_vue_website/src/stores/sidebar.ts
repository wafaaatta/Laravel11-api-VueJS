import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
  const isSidebarCollapsed = ref(false);

  // Load initial state from local storage
  if (localStorage.getItem('isSidebarCollapsed')) {
    isSidebarCollapsed.value = JSON.parse(localStorage.getItem('isSidebarCollapsed')!);
  }

  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    localStorage.setItem('isSidebarCollapsed', JSON.stringify(isSidebarCollapsed.value));
  };

  return {
    isSidebarCollapsed,
    toggleSidebar
  };
});
