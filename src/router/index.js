import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agendar/',
      name: 'agendar',
      component: () => import('../views/Agendar.vue')
    },
    {
      path: '/sobre/',
      name: 'sobre',
      component: () => import('../views/AboutView.vue')
    },
  ]
})

export default router
