<template>
  <div class="profile-view">
    <div class="profile-card">
      <div class="profile-header">
        <img :src="user?.profile_photo_url" alt="User Avatar" class="avatar" />
        <h2 class="profile-name">{{ user?.name }}</h2>
        <p class="profile-username">@{{ user?.name }}</p>
        
      </div>
      <div class="profile-details">
        <div class="profile-detail">
          <h3 class="detail-title">
            <i class="pi pi-envelope"></i> <span>{{ user?.email }}</span>
          </h3>
        </div>
      </div>
      <div class="actions">
        <button @click="showEditProfileDialog = true" class="edit-button">
          <i class="pi pi-pencil"></i> Edit Profile
        </button>
        <button @click="showChangePasswordDialog = true" class="password-button">
          <i class="pi pi-lock"></i> Change Password
        </button>
      </div>
    </div>

    <!-- Edit Profile Dialog -->
    <Dialog header="Edit Profile" v-model:visible="showEditProfileDialog" :modal="true" :closable="false" :draggable="false" style="width: 400px">
      <div class="dialog-content">
        <div class="field">
          <label for="name">Name</label>
          <InputText v-model="editProfileForm.name" id="name" :inputStyle="{ width: '100%' }"
          :style="{ width: '100%' }" />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <InputText v-model="editProfileForm.email" id="email" :inputStyle="{ width: '100%' }"
          :style="{ width: '100%' }"/>
        </div>
        <div class="dialog-actions">
          <Button label="Save" icon="pi pi-check" @click="saveProfile" />
          <Button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="showEditProfileDialog = false" />
        </div>
      </div>
    </Dialog>

    <!-- Change Password Dialog -->
    <Dialog header="Change Password" v-model:visible="showChangePasswordDialog" :modal="true" :closable="false" :draggable="false" style="width: 400px">
      <div class="dialog-content">
        <div class="field">
          <label for="currentPassword">Current Password</label>
          <Password v-model="changePasswordForm.currentPassword" id="currentPassword" :feedback="false" :inputStyle="{ width: '100%' }"
          :style="{ width: '100%' }" />
        </div>
        <div class="field">
          <label for="newPassword">New Password</label>
          <Password v-model="changePasswordForm.newPassword" id="newPassword" :feedback="false" :inputStyle="{ width: '100%' }"
          :style="{ width: '100%' }"/>
        </div>
        <div class="field">
          <label for="confirmPassword">Confirm Password</label>
          <Password v-model="changePasswordForm.confirmPassword" id="confirmPassword" :feedback="false" :inputStyle="{ width: '100%' }"
          :style="{ width: '100%' }"/>
        </div>
        <div class="dialog-actions">
          <Button label="Change" icon="pi pi-check" @click="changePassword" />
          <Button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="showChangePasswordDialog = false" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authentication.js';
import { storeToRefs } from 'pinia';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { useToast } from 'primevue/usetoast';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const showEditProfileDialog = ref(false);
const showChangePasswordDialog = ref(false);

const editProfileForm = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
});

const changePasswordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const toast = useToast();

const saveProfile = async () => {
  try {
    console.log(editProfileForm.value);
    
    await authStore.updateProfile(editProfileForm.value);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully', life: 3000 });
    showEditProfileDialog.value = false;
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
  }
};

const changePassword = async () => {
  if (changePasswordForm.value.newPassword !== changePasswordForm.value.confirmPassword) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match', life: 3000 });
    return;
  }

  try {
    await authStore.changePassword(changePasswordForm.value);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully', life: 3000 });
    showChangePasswordDialog.value = false;
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
  }
};
</script>

<style scoped>
.profile-view {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  text-align: center;
}

.profile-header {
  position: relative;
  margin-bottom: 2rem;
}

.avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid #007bff;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.profile-username {
  font-size: 1rem;
  color: #666;
}

.verification-badge, .non-verification-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
}

.verification-badge {
  color: #28a745;
}

.non-verification-badge {
  color: #dc3545;
}

.profile-details {
  margin-bottom: 2rem;
}

.profile-detail {
  margin-bottom: 1rem;
}

.detail-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.edit-button,
.password-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
}

.edit-button:hover {
  background-color: #0056b3;
}

.password-button {
  background-color: #dc3545;
  color: #fff;
}

.password-button:hover {
  background-color: #c82333;
}

.pi {
  font-size: 1.25rem;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
