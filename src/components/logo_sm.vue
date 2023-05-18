<template>


  <div>
    <img id='logo' :src="Logo" alt="Logo do meu aplicativo">
  </div>



</template>

<script>
import Logo from '@/assets/logo.png'

export default {
  name: 'logo_small',
  data() {
    return {
      Logo: Logo,
    }
  },
}


</script>

<style scoped>
  #logo{
    height: 220px;
    border-radius: 10%;
    

  }
</style>