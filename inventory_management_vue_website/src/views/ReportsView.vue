<script setup lang="ts">
import { ref } from 'vue';

interface Report {
  id: number;
  title: string;
  date: string;
  author: string;
  status: string;
}

const reports = ref<Report[]>([
  { id: 1, title: 'Monthly Sales', date: '2024-06-01', author: 'John Doe', status: 'Completed' },
  { id: 2, title: 'Inventory Analysis', date: '2024-06-15', author: 'Jane Smith', status: 'Pending' },
  { id: 3, title: 'Quarterly Earnings', date: '2024-06-20', author: 'Bob Brown', status: 'Completed' },
]);

const handleView = (report: Report) => {
  console.log('Viewing report:', report);
};

const handleDelete = (report: Report) => {
  console.log('Deleting report:', report);
};

const generateReport = () => {
  console.log('Generating new report');
};
</script>

<template>
  <div class="reports-view">
    <div class="header">
      <h1>Reports</h1>
      <button class="generate-button" @click="generateReport">
        <i class="pi pi-plus"></i> Generate New Report
      </button>
    </div>
    <div class="card-container">
      <div v-for="report in reports" :key="report.id" class="report-card">
        <div class="card-header">
          <h2>{{ report.title }}</h2>
          <div class="actions">
            <i class="pi pi-eye" @click="handleView(report)"></i>
            <i class="pi pi-trash" @click="handleDelete(report)"></i>
          </div>
        </div>
        <div class="card-body">
          <p><strong>Date:</strong> {{ report.date }}</p>
          <p><strong>Author:</strong> {{ report.author }}</p>
          <div class="status-holder">
            <span :class="['status-tag', report.status.toLowerCase()]">{{ report.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reports-view {
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

.generate-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-button i {
  margin-right: 0.5rem;
}

.generate-button:hover {
  background-color: var(--hover-color);
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.report-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.actions i {
  margin: 0 0.25rem;
  font-size: 1.25rem;
  cursor: pointer;
}

.actions i:hover {
  color: #0056b3;
}

.card-body {
  margin-top: 1rem;
}

.status-tag {
  padding: 0.25rem 0.50rem;
  border-radius: 0.25rem;
  color: #fff;
  font-weight: 500;
  display: inline-block;
  margin-top: 0.5rem;
}

.status-holder {
  display: flex;
  justify-content: flex-end;
}

.status-tag.completed {
  background-color: #28a745;
}

.status-tag.pending {
  background-color: #ffc107;
}
</style>
