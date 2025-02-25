import { createRouter, createWebHistory } from 'vue-router';
import HomeToDo from '@/views/HomeToDo.vue';
import CreateToDo from '@/views/CreateToDo.vue';

const routes = [
  { path: '/', component: HomeToDo },
  { path: '/create', component: CreateToDo },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
