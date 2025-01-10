import { createRouter, createWebHistory } from 'vue-router'
import { useProjectStore } from '../stores/project.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('../views/ProjectView.vue'),
      beforeEnter: async (to, from, next) => {
        const slug = to.params.slug
        const projectStore = useProjectStore()

        const project = await projectStore.fetchProjectDetailsBySlug(slug as string)

        if (!project) {
          next({ name: 'NotFound' })
          return false
        }

        next()
      },
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import('../views/DevPlaygroundView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
