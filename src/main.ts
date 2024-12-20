import { createApp } from 'vue'
import App from './App.vue'
import Layout from './components/Layout.vue'

import router from './router'
import store from './store'

createApp(Layout).use(store).use(router).mount('#app')
