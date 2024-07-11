<template>
  <div class="categories-view">
    <i class="pi pi-box pi-spin" style="font-size: 2rem;" v-if="loading"></i>
    <header class="header">
      <h1>Categories</h1>
      <button class="add-button" @click="addCategory">
        <span style="margin-right: 0.5rem">Add New Category</span>
        <i class="pi pi-plus"></i>
      </button>
    </header>
    <div class="table-container">
      <DataTable
        :value="categories"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem;"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="categoryStore.getAllCategories" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text />
        </template>
        <Column field="id" header="ID" sortable style="width: 20%" center></Column>
        <Column header="Image" style="width: 20%" center>
          <template #body="slotProps">
            <img :src="storageUrl + slotProps.data.image" alt="Category Image" class="image" style="height: 40px;" />
          </template>
        </Column>
        <Column field="title" header="Name" style="width: 20%"></Column>
        <Column field="description" header="Description" style="width: 20%"></Column>
        <Column header="Actions" style="width: 20%">
          <template #body="slotProps">
            <div class="actions">
              <i class="pi pi-eye" :style="{ color: primaryColor }" @click="viewCategory(slotProps.data.id)"></i>
              <i class="pi pi-pencil" :style="{ color: secondaryColor }" @click="openUpdateDialog(slotProps.data)" style="margin: 0 0.25rem;"></i>
              <i class="pi pi-trash" :style="{ color: dangerColor }" @click="confirmDelete(slotProps.data.id)"></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Update Category Dialog -->
    <Dialog
      header="Update Category"
      v-model:visible="dialogVisible"
      modal
      :style="{ width: '50vw' }"
    >
      <form @submit.prevent="handleUpdateCategory">
        <div class="form-field">
          <label for="update-title">Title</label>
          <InputText
            id="update-title"
            v-model="selectedCategory.title"
            type="text"
            placeholder="Enter category title"
            required
          />
        </div>
        <div class="form-field">
          <label for="update-description">Description</label>
          <InputText
            id="update-description"
            v-model="selectedCategory.description"
            type="text"
            placeholder="Enter category description"
            required
          />
        </div>
        <div class="dialog-footer">
          <Button type="button" label="Cancel" icon="pi pi-times" @click="dialogVisible = false" class="p-button-secondary" style="margin-right: 0.5rem;" />
          <Button type="submit" label="Save" icon="pi pi-check" />
        </div>
      </form>
    </Dialog>

    <!-- Confirmation Dialog -->
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { type Category, useCategoryStore } from '@/stores/category_store.js';
import { storeToRefs } from 'pinia';
import { dangerColor, primaryColor, secondaryColor } from '@/constants/colors.js';
import { useToast } from 'primevue/usetoast';
import { storageUrl } from '@/constants/app_constants.js';

const categoryStore = useCategoryStore();
const confirm = useConfirm();
const toast = useToast();

onMounted(() => {
  categoryStore.getAllCategories();
});

const { categories, loading } = storeToRefs(categoryStore);
const router = useRouter();

const dialogVisible = ref(false);
const selectedCategory = ref<Category>({ id: 0, title: '', description: '' });

const openUpdateDialog = (category: { id: number; title: string; description: string }) => {
  selectedCategory.value = { ...category };
  dialogVisible.value = true;
};

const handleUpdateCategory = async () => {
  try {
    console.log('Updating category:', selectedCategory.value);
    // Add your update logic here
    await categoryStore.updateCategory(selectedCategory.value);
    dialogVisible.value = false;
  } catch (error) {
    console.error('Failed to update category:', error);
  }
};

const addCategory = () => {
  router.push('/dashboard/categories/create');
};

const viewCategory = (id: number) => {
  router.push(`/dashboard/categories/${id}/products`);
};

const confirmDelete = (id: number) => {
  confirm.require({
    message: 'Are you sure you want to delete this category?',
    header: 'Confirm Deletion',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
    },
    acceptProps: {
        label: 'Delete'
    },
    accept: () => {
      deleteCategory(id);
    },
  })
};

const deleteCategory = async (id: number) => {
  try {
    console.log('Deleting category', id);
    // Add your delete logic here
    await categoryStore.deleteCategory(id);
    toast.add({ severity: 'info', summary: 'Deleted', detail: 'Category deleted successfully', life: 3000 });


  } catch (error) {
    console.error('Failed to delete category:', error);
  }
};
</script>

<style scoped>
.categories-view {
  padding: 1rem;
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

.add-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.add-button:hover {
  background-color: var(--hover-color);
}

.table-container {
  overflow-x: auto;
}

.p-datatable-sm .p-datatable-thead > tr > th {
  padding: 0.75rem;
}

.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0.75rem;
}

.actions i {
  margin: 0 0.25rem;
  font-size: 1.25rem;
  cursor: pointer;
}

.actions i:hover {
  color: #0056b3;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.form-field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
