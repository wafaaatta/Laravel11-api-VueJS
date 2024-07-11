import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue';
import UserLayout from '@/layouts/UserLayout.vue';

import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import InventoryView from '@/views/InventoryView.vue';
import ProductsView from '@/views/ProductsView.vue';
import CategoriesView from '@/views/CategoriesView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import VerifyOtpView from '@/views/VerifyOtpView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
import SettingsView from '@/views/SettingsView.vue';
import OrdersView from '@/views/OrdersView.vue';
import ReportsView from '@/views/ReportsView.vue';
import ProfileView from '@/views/ProfileView.vue';
import CreateCategoryView from '@/views/CreateCategoryView.vue';
import CategoryProductsView from '@/views/CategoryProductsView.vue';
import CreateProductView from '@/views/CreateProductView.vue';
import CreateOrderView from '@/views/CreateOrderView.vue';
import UserHomeView from '@/views/UserHomeView.vue';
// import SettingsView from '@/views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordView,
    },
    {
      path: '/verify-otp',
      name: 'VerifyOtp',
      component: VerifyOtpView,
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPasswordView,
    },
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '',
          name: 'User Home Screen',
          component: UserHomeView,
        },
        {
          path: 'categories/:id/products',
          name: 'Categories Products',
          component: CategoryProductsView,
        },
        {
          path: 'profile',
          name: 'User Profile',
          component: ProfileView,
        },
      ]
    },
    {
      path: '/dashboard',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: DashboardView,
        },
        {
          path: 'inventory',
          name: 'Inventory',
          component: InventoryView,
        },
        {
          path: 'products',
          name: 'Products',
          component: ProductsView,
        },
        {
          path: 'products/create',
          name: 'Products Create',
          component: CreateProductView,
        },
        {
          path: 'categories',
          name: 'Categories',
          component: CategoriesView,
        },
        {
          path: 'categories/:id/products',
          name: 'Admin Categories Products',
          component: CategoryProductsView,
        },
        {
          path: 'categories/create',
          name: 'Categories Create',
          component: CreateCategoryView,
        },
        {
          path: 'settings',
          name: 'Settings',
          component: SettingsView,
        },
        {
          path: 'orders',
          name: 'Orders',
          component: OrdersView,
        },
        {
          path: 'orders/create',
          name: 'Orders Create',
          component: CreateOrderView,
        },
        {
          path: 'reports',
          name: 'Reports',
          component: ReportsView,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: ProfileView,
        },
      ],
    },
  ]
})

export default router
