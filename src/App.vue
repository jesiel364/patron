

<template>
  <v-app theme="light" id="inspire">


<NavDrawer />

    <v-main>
      <RouterView />
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
