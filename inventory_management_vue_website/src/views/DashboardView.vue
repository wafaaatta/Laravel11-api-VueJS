<template>
    <div class="dashboard-view">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
      </header>
  
      <section class="metrics">
        <div class="metric-card">
          <div class="metric-icon">
            <i class="pi pi-box"></i>
          </div>
          <div class="metric-info">
            <h2>Products</h2>
            <p>{{ totalProducts }}</p>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">
            <i class="pi pi-users"></i>
          </div>
          <div class="metric-info">
            <h2>Suppliers</h2>
            <p>{{ totalSuppliers }}</p>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">
            <i class="pi pi-shopping-cart"></i>
          </div>
          <div class="metric-info">
            <h2>Orders</h2>
            <p>{{ totalOrders }}</p>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">
            <i class="pi pi-chart-bar"></i>
          </div>
          <div class="metric-info">
            <h2>Reports</h2>
            <p>{{ totalReports }}</p>
          </div>
        </div>
      </section>
  
      <section class="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li v-for="activity in recentActivities" :key="activity.id">
            {{ activity.description }}
          </li>
        </ul>
      </section>
  
      <section class="inventory-statistics">
        <h2>Inventory Statistics</h2>
        <div class="stats">
          <div class="stat-card">
            <h3>Products In Stock</h3>
            <p>{{ productsInStock }}</p>
          </div>
          <div class="stat-card">
            <h3>Products Out of Stock</h3>
            <p>{{ productsOutOfStock }}</p>
          </div>
          <div class="stat-card">
            <h3>Pending Orders</h3>
            <p>{{ pendingOrders }}</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
  
  const totalProducts = ref(120);
  const totalSuppliers = ref(34);
  const totalOrders = ref(76);
  const totalReports = ref(12);
  
  const recentActivities = ref([
    { id: 1, description: 'Product X added to inventory' },
    { id: 2, description: 'Supplier Y added' },
  { id: 3, description: 'Order #1234 shipped' },
]);

const productsInStock = ref(80);
const productsOutOfStock = ref(40);
const pendingOrders = ref(20);
</script>

<style scoped>
.dashboard-view {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metrics {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}

.metric-card {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  width: calc(50% - 1rem); /* Adjust width for responsive layout */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.metric-icon {
  font-size: 2rem;
  color: #007bff;
  margin-right: 1rem;
}

.metric-info h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #333333;
}

.metric-info p {
  margin: 0;
  font-size: 1.5rem;
  color: #666666;
}

.recent-activities,
.inventory-statistics {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-activities h2,
.inventory-statistics h2 {
  margin-top: 0;
}

.recent-activities ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.recent-activities ul li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #dcdcdc;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}

.stat-card {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  width: calc(33.333% - 1rem); /* Adjust width for responsive layout */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin-top: 0;
  color: #333333;
}

.stat-card p {
  font-size: 1.5rem;
  color: #666666;
}

/* Responsive Design */
@media (max-width: 768px) {
  
  .stat-card {
    width: calc(100% - 1rem);
  }

  .metric-card{
    width: 100%
  }
}
</style>