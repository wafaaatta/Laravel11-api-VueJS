<template>
  <div class="products-view">
    <i class="pi pi-box pi-spin" style="font-size: 2rem;" v-if="loading"></i>
    <header class="header">
      <h1>Products</h1>
      <button class="add-button" @click="addNewProduct">
        <i class="pi pi-plus"></i>
        Add New Product
      </button>
    </header>
    <div class="table-container">
      <DataTable
        :value="products"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 60rem;"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="refreshProducts" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text />
        </template>
        <Column field="id" header="Product ID" style="width: 10%"></Column>
        <Column field="name" header="Name" style="width: 10%"></Column>
        <Column header="Image" style="width: 10%">
          <template #body="slotProps">
            <img :src="storageUrl + slotProps.data.image" alt="Product Image" class="image" style="height: 40px;" />
          </template>
        </Column>
        <Column field="description" header="Description" style="width: 10%"></Column>
        <Column field="category.title" header="Category" style="width: 10%"></Column>
        <Column field="price" header="Price" style="width: 10%" :body="priceBodyTemplate"></Column>
        <Column field="stock" header="Stock" style="width: 10%"></Column>
        <Column header="Actions" style="width: 10%">
          <template #body="slotProps">
            <div class="actions">
              <i class="pi pi-eye" @click="viewProduct(slotProps.data)" title="View" :style="{ color: primaryColor }"></i>
              <i class="pi pi-pencil" @click="openEditDialog(slotProps.data)" title="Edit" :style="{ color: secondaryColor }" style="margin: 0 0.25rem;"></i>
              <i class="pi pi-trash" @click="confirmDelete(slotProps.data)" title="Delete" :style="{ color: dangerColor }"></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Edit Product Dialog -->
    <Dialog header="Edit Product" :visible="editDialogVisible" :modal="true" @hide="closeEditDialog" style="width: 400px">
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeEditDialog" style="margin-right: 0.5rem; color: #f44336"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">Name</label>
          <InputText id="name" v-model="editProductData.name" />
        </div>
        <div class="p-field">
          <label for="category">Category</label>
          <InputText id="category" v-model="editProductData.category" />
        </div>
        <div class="p-field">
          <label for="price">Price</label>
          <InputNumber id="price" v-model="editProductData.price" mode="currency" currency="USD" locale="en-US" />
        </div>
        <div class="p-field">
          <label for="stock">Stock</label>
          <InputNumber id="stock" v-model="editProductData.stock" />
        </div>
      </div>
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
import InputNumber from 'primevue/inputnumber';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { dangerColor, primaryColor, secondaryColor } from '@/constants/colors.js';
import { useProductStore, type Product } from '@/stores/product_store.js';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { storageUrl } from '@/constants/app_constants.js';

const router = useRouter();
const productStore = useProductStore();
const { products, loading } = storeToRefs(productStore);

const editDialogVisible = ref(false);
const editProductData = ref<Product | null>(null);

onMounted(() => {
  productStore.getAllProducts();
});

const addNewProduct = () => {
  router.push('/dashboard/products/create');
};

const viewProduct = (product: Product) => {
  console.log('View product:', product);
};

const openEditDialog = (product: Product) => {
  editProductData.value = { ...product };
  editDialogVisible.value = true;
};

const closeEditDialog = () => {
  editDialogVisible.value = false;
  editProductData.value = null;
};

const saveProduct = async () => {
  if (editProductData.value) {
    try {
      await productStore.updateProduct(editProductData.value).then(() => {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully', life: 3000 });
        refreshProducts();
      });
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update product', life: 3000 });
    } finally {
      closeEditDialog();
    }
  }
};

const confirm = useConfirm();
const confirmDelete = (product: Product) => {
  confirm.require({
    message: 'Are you sure you want to delete this product?',
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptLabel: 'Delete',
    accept: () => deleteProduct(product),
  });
};

const toast = useToast();

const deleteProduct = async (product: Product) => {
  try {
    await productStore.deleteProduct(product.id).then(() => {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully', life: 3000 });
      refreshProducts();
    });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete product', life: 3000 });
  }
};

const refreshProducts = async () => {
  await productStore.getAllProducts();
};

const priceBodyTemplate = (rowData: Product) => {
  return `$${rowData.price.toFixed(2)}`;
};
</script>

<style scoped>
.products-view {
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
  background-color: var(--primary-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button i {
  margin-right: 0.5rem;
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

.p-dialog .p-fluid .p-field {
  margin-bottom: 1rem;
}
</style>
