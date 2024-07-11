<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Menu from 'primevue/menu';
import { useToast } from 'primevue/usetoast';

interface Order {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

const orders = ref<Order[]>([
  { id: 1, customerName: 'Alice Johnson', productName: 'Laptop', quantity: 2, totalPrice: 2000, status: 'Shipped' },
  { id: 2, customerName: 'Bob Smith', productName: 'Smartphone', quantity: 1, totalPrice: 800, status: 'Processing' },
  { id: 3, customerName: 'Charlie Brown', productName: 'Headphones', quantity: 5, totalPrice: 500, status: 'Delivered' },
]);

const statusOptions = ['Shipped', 'Processing', 'Delivered'];
const toast = useToast();

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Shipped':
      return 'status-shipped';
    case 'Processing':
      return 'status-processing';
    case 'Delivered':
      return 'status-delivered';
    default:
      return '';
  }
};

const handleView = (order: Order) => {
  toast.add({ severity: 'info', summary: 'View Order', detail: `Viewing order ID: ${order.id}`, life: 3000 });
};

const handleEdit = (order: Order) => {
  toast.add({ severity: 'info', summary: 'Edit Order', detail: `Editing order ID: ${order.id}`, life: 3000 });
};

const handleDelete = (order: Order) => {
  toast.add({ severity: 'warn', summary: 'Delete Order', detail: `Deleting order ID: ${order.id}`, life: 3000 });
};

const router = useRouter();
</script>

<template>
  <div class="orders-view">
    <div class="header">
      <h1>Orders</h1>
      <Button label="Add New Order" icon="pi pi-plus" @click="router.push('/orders/create')" size="small" />
    </div>
    <div class="table-container">
      <DataTable :value="orders" responsiveLayout="scroll">
        <Column field="id" header="Order ID" />
        <Column field="customerName" header="Customer Name" />
        <Column field="productName" header="Product Name" />
        <Column field="quantity" header="Quantity" />
        <Column field="totalPrice" header="Total Price" />
        <Column
          header="Status"
          field="status"
          />
        <Column
          header="Actions"
          body="{ slotProps }" 
        >
          <template #body="{ slotProps }">
            <Button
              icon="pi pi-eye"
              class="p-button-rounded p-button-info p-button-text"
              @click="handleView(slotProps)"
            />
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-button-text"
              @click="handleEdit(slotProps)"
            />
            <Button
              icon="pi pi-trash"
              style="color: red;"
              class="p-button-rounded p-button-danger p-button-text"
              @click="handleDelete(slotProps)"
            />
          </template>
      </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.orders-view {
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
}

.table-container {
  overflow-x: auto;
}

.actions .p-button-text {
  margin: 0 0.25rem;
}

.status-tag {
  padding: 0.25rem 0.50rem;
  border-radius: 0.25rem;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  user-select: none;
  display: inline-flex;
  align-items: center;
}

.status-shipped {
  background-color: #28a745;
}

.status-processing {
  background-color: #ffc107;
}

.status-delivered {
  background-color: #17a2b8;
}
</style>
