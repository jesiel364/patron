<template>
  <div class="container mx-auto mt-0">
 
  <v-card class='' id='img-card'>
  </v-card>
  
    
       <div class="" id="perfil">
    <logo_small class='text-center mb-5' id='logo' />
    <div>
    <p class="font-weight-bold" id="perfil-name">Yda Jean Barbershop</p>
    <p class="text-subtitle-1" id="perfil-desc">Rua Curió, 575, São Bento</p>
     </div>
    </div>
  <v-card id="content" class="mx-auto mt-7 pt-9">
   
  <div class="mb-8">
   
   
  </div>
  <!-- <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list
      :items="items"
      item-title="name"
      item-value="id"
    ></v-list>
  </v-card> -->
  
  <p id="thead" class="font-weight-black pt-7 mt-9 ml-3">Serviços</p>

  <div v-for="item in items" :key="id" id="container" class="mt-3 ml-4 mb-1 pb-0">
  
  <div id="cont-1">
    
    <p class="font-weight-bold" id="title">{{ item.name }}</p>
    <p class='text-subtitle-1' id="time">{{ item.time }}min</p>
    </div>
    
    <div  id="cont-2">
      <p id="valor" class="font-weight-bold">R${{ item.valor }},00</p>
      <v-btn class="ml-8 mr-3 mt-1 rounded-pill bg-brown">confirmar</v-btn>
      
  
  </div>
</div>

    
    
  </v-card>
  </div>
</template>

<script>
//import Vue from 'vue';
//import { bus } from './assets/bus';
import logo_small from '../components/logo_sm.vue'

  export default {
    components: {

    logo_small,

  },
    data: () => ({
      items: [
        {
          name: 'Militar',
          id: 1,
          valor: 12,
          time: 15
        },
        {
          name: 'Social',
          id: 2,
          valor: 15,
          time: 20
        },
        {
          name: 'Degradê Máquina',
          id: 3,
          valor: 20,
          time: 25
        },
        {
          name: 'Degradê Navalha',
          id: 4,
          valor: 25,
          time: 30
        },
        {
          name: 'Sobrancelha',
          id: 5,
          valor: 10,
          time: 5
        },
        {
          name: 'Barba',
          id: 6,
          valor: 5,
          time: 5
        },
        
      ],
    }),
  }
</script>

  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Lato&display=swap');


<style scoped>
html, body{
  width: 100%;
  max-width: 100vw;
  height: 100%;
  padding: 0;
  margin: 0;
}

#container{
  /*background-color:grey; */
  display: flex;
  justify-content: space-between;
  border-radius: 22px;
  
  
}

.container{
  
  
}

#cont-1{
  display: flex;
  flex-direction: column;
  
  /* background-color: green; */
vertical-align: middle;
margin-bottom: 0px ;
}

#cont-2{
  display: flex;
  /* background-color: green; */
  flex-direction: row;
  justify-content: space-between;

}

#valor{
  /* line-height: 3; */
  display: flex;
  margin-top: 10px;
  
}

v-btn{
  display: flex;
  margin-top: 20px;
  
}

#time, #title{
  /* background-color: green; */
  margin-top: 10px;
  display: flex;


}

#time{
  /* background-color: green; */
  line-height: 5px;
}

#thead{
  /* font-family: 'Lato', sans-serif; */
  font-size: 18px;
}

#img-card{
    /* max-width: 100%; */
   
 
    height: 400px;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url( '../src/assets/allef-vinicius-IvQeAVeJULw-unsplash.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
    /* transform: scale(1.1); */
}

#content{
  /*background-color: #e1e1e1; */
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 380px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 45px;
}

#perfil{
  height: 100px;
    /*background-color: red;*/
  width: 400px;
  position: absolute;
  left: 0;
  right: -80px;
  top: 130px;
  z-index: 10;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-items: space-between;
}



#perfil-name{
  margin-top: 110px;
  margin-left: 20px;
  font-size: 16px;
  font-family: 'Lato', sans-serif; 
  text-transform: uppercase;
}
#perfil-desc{
  
  margin-left: 20px;
  font-size: 14px;
  
}
</style>