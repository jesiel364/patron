

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
import { useDark, useToggle, useColorMode } from '@vueuse/core'
import { RouterLink, RouterView } from 'vue-router'
import NavDrawer from './components/NavDrawer.vue'

const isDark = useDark()
const colorMode = useColorMode()
const toggleDark = useToggle(isDark)

export default {
    data: () => ({ drawer: null }),

    components: {
    NavDrawer,
  }
  }

</script>

<style>
    .dark{
        background-color: #282828;
        color: white;
    }
</style>
