<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

interface Order {
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

const customerName = ref('');
const productName = ref('');
const quantity = ref<number | null>(null);
const totalPrice = ref<number | null>(null);
const status = ref('Pending');

const router = useRouter();

const statuses = [
  { name: 'Pending', code: 'Pending' },
  { name: 'Processing', code: 'Processing' },
  { name: 'Shipped', code: 'Shipped' },
  { name: 'Delivered', code: 'Delivered' }
];

const handleSubmit = () => {
  const newOrder: Order = {
    customerName: customerName.value,
    productName: productName.value,
    quantity: quantity.value ?? 0,
    totalPrice: totalPrice.value ?? 0,
    status: status.value,
  };
  
  console.log('Creating order:', newOrder);
  
  // Here you would typically send the newOrder to your backend
  // For now, let's just redirect to the orders page
  router.push('/orders');
};
</script>

<template>
  <div class="create-order-view">
    <div class="header">
      <h1>Create New Order</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="order-form">
      <div class="form-group">
        <label for="customerName">Customer Name</label>
        <InputText id="customerName" v-model="customerName" placeholder="Enter customer name" />
      </div>
      <div class="form-group">
        <label for="productName">Product Name</label>
        <InputText id="productName" v-model="productName" placeholder="Enter product name" />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" v-model.number="quantity" min="1" placeholder="Enter quantity" style="width: 100%;"/>
      </div>
      <div class="form-group">
        <label for="totalPrice">Total Price</label>
        <InputNumber id="totalPrice" v-model.number="totalPrice" min="0" step="0.01" placeholder="Enter total price" style="width: 100%;" />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <Dropdown id="status" v-model="status" :options="statuses" optionLabel="name" placeholder="Select status" style="width: 100%;"/>
      </div>
      <div class="form-actions">
        <Button type="submit" label="Create Order" class="submit-button" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.create-order-view {
  padding: 1rem;
  width: 100%;
  margin: 0 auto; /* Center the form horizontally */
  border-radius: 8px;
}

.header {
  margin-bottom: 1rem;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.order-form {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group .p-inputtext,
.form-group .p-dropdown {
  width: 100%;
}

.submit-button {
  padding: 0.5rem 1rem; /* Smaller button size */
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.875rem; /* Smaller font size */
}

.submit-button:hover {
  background-color: var(--hover-color);
}

.form-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end; /* Align button to the end */
}
</style>
