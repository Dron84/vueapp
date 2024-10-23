import { createRouter, createWebHistory } from 'vue-router';
import PostsView from '@/views/PostsView.vue';

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: PostsView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
