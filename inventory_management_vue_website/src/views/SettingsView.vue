<template>
  <div class="settings-view">
    <div class="settings-card">
      <h2 class="settings-title">Settings</h2>
      <form @submit.prevent="handleSaveSettings">
        <!-- Dashboard Settings -->
        <div class="settings-section">
          <h3 class="section-title">Dashboard Settings</h3>
          <div class="form-field">
            <label for="theme">Theme</label>
            <Dropdown
              id="theme"
              v-model="settings.dashboard.theme"
              :options="themeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a Theme"
            />
          </div>
        </div>

        <!-- User Settings -->
        <div class="settings-section">
          <h3 class="section-title">User Settings</h3>
          <div class="form-field">
            <label for="username">Username</label>
            <InputText
              id="username"
              v-model="settings.user.username"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
          <div class="form-field">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="settings.user.email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-field">
            <label for="password">New Password</label>
            <div class="password-field">
              <Password
                id="password"
                v-model="settings.user.password"
                :toggleMask="true"
                :feedback="true"
                style="width: 100%"
                :inputStyle="{ width: '100%' }"
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        <button type="submit" class="save-button">Save Settings</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useAuthStore } from '@/stores/authentication.js';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const {user} = storeToRefs(authStore)

const settings = ref({
  dashboard: {
    theme: 'light',
  },
  user: {
    username: user.value?.name || '',
    email: user.value?.email || '',
    password: '',
  },
});

const themeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const handleSaveSettings = () => {
  console.log('Saving settings:', settings.value);
  // Add your settings saving logic here
};
</script>

<style scoped>
.settings-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 1rem;
}

.settings-card {
  width: 100%;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.settings-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.settings-section {
  margin-bottom: 2rem;
}

.section-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
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

.password-field {
  position: relative;
}

.password-field .pi {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #114b5f;
}

.save-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: var(--primary-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: var(--hover-color);
}

/* Responsive styles */
@media (max-width: 768px) {
  .settings-card {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .settings-view {
    padding: 0.5rem;
  }

  .settings-card {
    width: 90%;
    padding: 1rem;
  }
}
</style>
