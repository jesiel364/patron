

<template>
  <v-app >


<NavDrawer />

    <v-main>
     <router-view>
       
       
     </router-view>
    </v-main>


 </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import NavDrawer from './components/NavDrawer.vue'

export default {
    data: () => ({ drawer: null }),

    components: {
    NavDrawer,
  }
  }

</script>
