<template>
  <div class="category-products-view">
    <h1>{{ categoryTitle }}</h1>
    <i v-if="loading" class="pi pi-spin pi-spinner"></i>
    <div v-if="products.length" class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card" @click="$router.push(`/products/${product.id}`)">
        <div class="product-image-container">
          <img :src="storageUrl + product.image" :alt="product.name" class="product-image" />
        </div>
        
        <div class="product-info">
          <div class="price-holder">
            <h3>{{ product.name }}</h3>
            <p class="price">${{ product.price }}</p>
          </div>
          <h4>Description:</h4>
          <p>{{ product.description }}</p>

          <div class="stock">
            <p>Stock: {{ product.stock }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-products-message">
      <p>No products found in this category.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/category_store';
import { useProductStore } from '@/stores/product_store';
import { storeToRefs } from 'pinia';
import { storageUrl } from '@/constants/app_constants.js';

const route = useRoute();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const { categories } = storeToRefs(categoryStore);
const { products, loading, api_error } = storeToRefs(productStore);

const categoryId = ref<number | null>(null);
const categoryTitle = ref<string>('');
const categoryProducts = ref([]);

const loadCategoryProducts = async () => {
  if (categoryId.value !== null) {
    await productStore.fetchProductsByCategoryId(categoryId.value);
    categoryProducts.value = products.value.filter(product => product.categoryId === categoryId.value);
    const category = categories.value.find(cat => cat.id === categoryId.value);
    categoryTitle.value = category ? category.title : 'Category';
  }
};

watch(() => route.params.id, (newId) => {
  categoryId.value = Number(newId);
  loadCategoryProducts();
});

onMounted(() => {
  categoryId.value = Number(route.params.id);
  loadCategoryProducts();
});
</script>

<style scoped>
.category-products-view {
  padding: 2rem;
  background-color: #f9f9f9;
}

.category-products-view h1 {
  font-size: 2.5rem;
  color: #114B5F;
  margin-bottom: 1rem;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  width: calc(25% - 1.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;
  cursor: pointer;
  padding: 12px;
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s;
}

.product-info {
  padding: 0.25rem;
  width: 100%;
}

.product-info h3 {
  font-size: 1.5rem;
  color: #114B5F;
  margin: 0.5rem 0;
}

.product-info p {
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
}

.product-info .price {
  font-size: 1rem;
  color: #333;
}

.no-products-message {
  font-size: 1.25rem;
  color: #555;
  margin-top: 2rem;
}

.price-holder{
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 100%;
}

.stock{
  text-align: end
}
</style>
