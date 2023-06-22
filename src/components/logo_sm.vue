<template>


      <div class="d-flex align-center ml-auto mr-auto" style="background-color: white; width: 250px; height: 250px; border-radius: 100%;">
      <img class="ml-auto mr-auto" style="width: 250px; height: 250px; border-radius: 100%;" :src="Logo" />
      
      
    </div>



</template>

<script>
import Logo from '@/assets/logo.jpg'

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