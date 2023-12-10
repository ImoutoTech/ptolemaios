import { createApp } from 'vue'

import App from './App.vue'
import pinia from './stores/pinia'
import router from './router'

import '@/assets/main.css'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
