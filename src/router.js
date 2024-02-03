import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from './pages/DashboardPage.vue';
import TagsPage from './pages/TagsPage.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardPage,
  },
  {
    path: '/tags',
    name: 'tags',
    component: TagsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;