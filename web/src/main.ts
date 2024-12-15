import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { primveVueConfig } from './config/primevue-config'

const app = createApp(App)

app.use(PrimeVue, primveVueConfig)
app.use(createPinia())
app.use(router)

app.mount('#app')
