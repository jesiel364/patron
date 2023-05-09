<template>
  <v-card>
    <v-card-title>Serviços</v-card-title>
    
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list
      :items="items"
      item-title="name"
      item-value="id"
    ></v-list>
  </v-card>

<div id="container" class="mt-3">
  <div id="cont-1"><span>Corte Militar</span>
    <span>15min</span>
    </div>
    
    <div  id="cont-2">
      <span id="valor" class="text-center">valor</span>
      <v-btn class="mx-3">book</v-btn>
      
  
  </div>
</div>
    
    
  </v-card>
  
  
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          name: 'Item #1',
          id: 1,
        },
        {
          name: 'Item #2',
          id: 2,
        },
        {
          name: 'Item #3',
          id: 3,
        },
      ],
    }),
  }
</script>

<style scoped>
#container{
  background-color: red;
  display: flex;
  justify-content: space-evenly;
}

#cont-1{
  display: flex;
  flex-direction: column;
  height: 50%;
}

#cont-2{
  display: flex;
  background-color: green;
  height: 50%;
}

#valor{
  line-height: 5;
}

v-btn{
  
}
</style>