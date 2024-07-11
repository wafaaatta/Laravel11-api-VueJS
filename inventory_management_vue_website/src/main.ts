import '@/assets/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Menu from 'primevue/menu';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(ToastService)
app.use(ConfirmationService);

app.component('Menu', Menu);

app.mount('#app')
