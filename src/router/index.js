import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/s',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agendar/:item',
      name: 'agendar',
      component: () => import('../views/Agendar.vue')
    },
    {
      path: '/',
      name: 'sobre',
      component: () => import('../views/AboutView.vue')
    },
    {

      path: '/servicos',

      name: 'servicos',
      component: () => import('../views/Serviços.vue')
    },
    
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../components/UserComponent.vue')
    },
    
        {

      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
