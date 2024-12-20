import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StatTodo from '../components/StatTodo.vue'
import Layout from '../components/Layout.vue'

import App from '../App.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/stats',
    component: StatTodo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
