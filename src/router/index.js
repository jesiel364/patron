import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/agendar/:item',
      name: 'agendar',
      component: () => import('../views/Agendar.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
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
    },

            {

      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/Cadastro.vue')
    },

                {

      path: '/painel',
      name: 'painel',
      component: () => import('../views/Painel.vue')
    }
  ]
})

export default router
