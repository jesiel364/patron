<template>
  <div class="container mx-auto mt-0">

  <v-card class='' id='img-card'>
  </v-card>
  <v-card id="content" class="mx-auto pt-4">
    
  <div class="mb-8">
    <div id="perfil">
      <!-- <v-img
  :width="300"
  aspect-ratio="16/9"
  cover
  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
></v-img> -->
      <v-card-title>Yda Jean Barber</v-card-title>
    </div>
    
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
  <p id="thead" class="font-weight-black ml-3">Serviços</p>

  <div v-for="item in items" :key="id" id="container" class="mt-3 ml-4 pb-3">
  
  <div id="cont-1">
    
    <p class="font-weight-bold" id="title">{{ item.name }}</p>
    <p class='text-subtitle-1' id="time">{{ item.time }}min</p>
    </div>
    
    <div  id="cont-2">
      <p id="valor" class="font-weight-bold">R${{ item.valor }},00</p>
      <v-btn class="ml-8 mr-8 mt-1 rounded-pill bg-brown">confirmar</v-btn>
      
  
  </div>
</div>
    
    
  </v-card>
  
</div>
</template>

<script>
  export default {
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
#container{
  /* background-color:grey; */
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
}

#thead{
  /* font-family: 'Lato', sans-serif; */
  font-size: 18px;
}

#img-card{
    /* max-width: 100%; */
    height: 1200px;
 
    
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url( '../src/assets/allef-vinicius-IvQeAVeJULw-unsplash.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
    /* transform: scale(1.1); */
}

#content{
  /* background-color: green; */
  position: absolute;
  top: 300px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 380px;
  min-width: 200px;
  height: auto;
  border-top-left-radius: 45px;
}

</style>