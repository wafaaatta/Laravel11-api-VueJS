<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import InputTextarea from 'primevue/textarea';
import { useProductStore, type Product } from '@/stores/product_store.js';
import { useToast } from 'primevue/usetoast';
import { useCategoryStore } from '@/stores/category_store.js';
import { storeToRefs } from 'pinia';

const product = ref<Omit<Product, 'id'>>({
  name: '',
  category: null,
  price: 0,
  stock: 0,
  description: '',
  image: null
});

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const toast = useToast();

const { categories } = storeToRefs(categoryStore);

onMounted(() => {
  categoryStore.getAllCategories();
});

const router = useRouter();

const handleSubmit = async () => {
  console.log('Saving product:', product.value);

  const formData = new FormData();
  formData.append('name', product.value.name);
  formData.append('category_id', product.value.category!.id as unknown as string);
  formData.append('price', product.value.price.toString());
  formData.append('stock', product.value.stock.toString());
  formData.append('description', product.value.description);
  if (product.value.image) {
    formData.append('image', product.value.image);
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Image is required', life: 3000 });
    return;
  }

  await productStore.addProduct(formData).then(() => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Product created successfully', life: 3000 });
    router.replace('/dashboard/products');
  }).catch((error) => {
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
  });
};

const handleCancel = () => {
  product.value = { name: '', category: null, price: 0, stock: 0, description: '', image: null };
  console.log('Product creation canceled');
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    product.value.image = target.files[0];
  }
};
</script>

<template>
  <div class="create-product-view">
    <div class="header">
      <h1>Create New Product</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-group">
        <label for="name">Product Name</label>
        <InputText id="name" v-model="product.name" placeholder="Enter product name" />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <Dropdown id="category" v-model="product.category" :options="categories" optionLabel="title" placeholder="Select Category" />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <InputNumber id="price" v-model.number="product.price" mode="currency" currency="USD" locale="en-US" placeholder="Enter product price" />
      </div>
      <div class="form-group">
        <label for="stock">Stock</label>
        <InputNumber id="stock" v-model.number="product.stock" min="0" placeholder="Enter product stock" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <InputTextarea id="description" v-model="product.description" rows="5" placeholder="Enter product description" />
      </div>
      <div class="form-group">
        <label for="image">Upload Image</label>
        <input id="image" type="file" @change="handleFileChange" class="custom-file-input" accept="image/*" />
      </div>
      <div class="buttons">
        <button class="cancel-button" @click="handleCancel">
          Cancel
        </button>
        <button class="save-button" type="submit">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.create-product-view {
  padding: 1rem;
  background-color: #f4f4f4;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group .p-inputtext,
.form-group .p-dropdown,
.form-group .p-inputnumber,
.form-group .p-inputtextarea {
  width: 100%;
}

.custom-file-input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.custom-file-input:hover {
  background-color: #f9f9f9;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.save-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.cancel-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
