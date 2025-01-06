import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { primveVueConfig } from './config/primevue-config'
import { ToastService, Tooltip } from 'primevue'

const app = createApp(App)
app.directive('tooltip', Tooltip)

app.use(PrimeVue, primveVueConfig)
app.use(createPinia())
app.use(router)
app.use(ToastService)

app.mount('#app')
