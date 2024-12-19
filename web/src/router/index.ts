import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import DevPlaygroundView from '../views/DevPlaygroundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: ProjectView,
    },
    {
      path: '/dev',
      name: 'dev',
      component: DevPlaygroundView,
    },
  ],
})

export default router
