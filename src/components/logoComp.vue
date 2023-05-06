<template>

  <container>
  <div>
    <img id='logo' :src="Logo" alt="Logo do meu aplicativo">
  </div>

</container>

</template>

<script>
import Logo from '@/assets/logo.png'

export default {
  name: 'logoComp',
  data() {
    return {
      Logo: Logo,
    }
  },
}


</script>

<style scoped>
  #logo{
    height: 350px;

  }
</style>