<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputTextarea from 'primevue/textarea';
import { useToast } from 'primevue/usetoast';
import { useCategoryStore } from '@/stores/category_store.js';
import { useRouter } from 'vue-router';

const title = ref('');
const description = ref('');
const image = ref<File | null>(null);
const toast = useToast();
const categoryStore = useCategoryStore();
const router = useRouter();

const handleSave = async () => {
  try {
    const formData: FormData = new FormData();
    formData.append('title', title.value);
    formData.append('description', description.value);
    if (image.value) {
      formData.append('image', image.value);
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Image is required', life: 3000 });
      return;
    }
    await categoryStore.addCategory(formData);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Category created successfully', life: 3000 });
    router.push('/dashboard/categories');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create category', life: 3000 });
  }
};

const handleCancel = () => {
  title.value = '';
  description.value = '';
  image.value = null;
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    image.value = target.files[0];
  }
};
</script>

<template>
  <div class="create-category-view">
    <div class="header">
      <h1>Create New Category</h1>
    </div>
    <div class="form-container">
      <div class="form-group">
        <label for="title">Category Title</label>
        <InputText id="title" v-model="title" placeholder="Enter category title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <InputTextarea id="description" v-model="description" rows="10" placeholder="Enter category description" autoResize style="width: 100%;" />
      </div>
      <div class="form-group">
        <label for="image">Upload Image</label>
        <input id="image" type="file" @change="handleFileChange" class="custom-file-input" accept="image/*" />
      </div>
      <div class="buttons">
        <button class="cancel-button" @click="handleCancel">Cancel</button>
        <button class="save-button" @click="handleSave">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-category-view {
  padding: 1rem;
  background-color: #f4f4f4;
}

.header {
  margin-bottom: 1rem;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.form-container {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
}

.cancel-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0.5rem 1rem;
}
</style>
