<template>
    <div class="inventory-view">
      <header class="header">
        <h1>Inventory</h1>
        <button class="add-button" @click="addNewItem">
          <i class="pi pi-plus"></i>
          Add New Item
        </button>
      </header>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Product ID</th>
              <th>Category</th>
              <th>Available Count</th>
              <th>Reserved Count</th>
              <th>On Hand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inventory" :key="item.productId">
              <td>{{ item.name }}</td>
              <td>{{ item.productId }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.availableCount }}</td>
              <td>{{ item.reservedCount }}</td>
              <td>{{ item.onHand }}</td>
              <td class="actions">
                <i class="pi pi-eye" @click="viewItem(item)" title="View"></i>
                <i class="pi pi-pencil" @click="editItem(item)" title="Edit"></i>
                <i class="pi pi-trash" @click="deleteItem(item)" title="Delete"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Define the interface for the inventory item
  interface InventoryItem {
    name: string;
    productId: string;
    category: string;
    availableCount: number;
    reservedCount: number;
    onHand: number;
  }
  
  // Sample inventory data
  const inventory = ref<InventoryItem[]>([
    {
      name: 'Item A',
      productId: 'A001',
      category: 'Category 1',
      availableCount: 10,
      reservedCount: 5,
      onHand: 15,
    },
    {
      name: 'Item B',
      productId: 'B002',
      category: 'Category 2',
      availableCount: 20,
      reservedCount: 10,
      onHand: 30,
    },
    // Add more items as needed
  ]);
  
  // Define methods for actions
  const viewItem = (item: InventoryItem) => {
    console.log('View item:', item);
  };
  
  const editItem = (item: InventoryItem) => {
    console.log('Edit item:', item);
  };
  
  const deleteItem = (item: InventoryItem) => {
    console.log('Delete item:', item);
    // Here you would typically call a method to remove the item from the inventory
  };
  
  const addNewItem = () => {
    console.log('Add new item');
    // Here you would typically show a form or navigate to another view to add a new item
  };
  </script>
  
  <style scoped>
  .inventory-view {
    padding: 1rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .header h1 {
    margin: 0;
  }
  
  .add-button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-button i {
    margin-right: 0.5rem;
  }
  
  .add-button:hover {
    background-color: #0056b3;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    /* border-collapse: collapse; */
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  thead {
    background-color: #f4f4f4;
  }
  
  th, td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    font-weight: bold;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
  
  .actions i {
    margin: 0 0.25rem;
    font-size: 1.25rem;
    cursor: pointer;
    color: #4A6670;
  }
  
  .actions i:hover {
    color: #0056b3;
  }
  </style>
  