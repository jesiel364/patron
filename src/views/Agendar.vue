<template>
 
    <div class='wrapper'>

 <div id="container">
      <div class="form bg-dark">

        <h2>Minha Reserva</h2>


        <v-card variant="outlined" class="div1">
          <v-avatar >
            <v-img  :src="barberPic" alt="John"></v-img>
          </v-avatar>
          <div id="barber-name">
            <p>Jean Pierre</p>
            <small>Cabeleireiro</small>
          </div>

          <div id='price'>
            <p>R${{corte.item.valor}},00</p>
          </div>

        </v-card>

        
          <div  class="div2">
          <v-avatar color="grey" size="60" rounded="">
            <v-img  :src="corte.item.img" cover></v-img>
          </v-avatar>
          <div id="info">
            <p id='corte'>{{corte.item.titulo}}</p>
            <p id='time'>{{corte.item.time}}</p>
          </div>
          <br>
          </div>
  
        <div class="mx-auto text-center">

        <VueDatePicker :min-date="new Date()" teleport-center=true id="date" placeholder="Que dia deseja?" :dark="true" class="mt-5" locale="pt-BR" v-model="date" week-numbers="iso"
        	cancel-text="Fechar"
        	select-text="Selecionar"
        ></VueDatePicker>



          <br>

       

          <v-text-field
        label="Seu nome"
        single-line
        variant="outlined"
        class='mt-2'
        
         v-model="cliente"
      ></v-text-field>

<h3 class="mb-2">Confira se está tudo certo</h3>
        </div>

        <v-card
        color=''
        class='pt-2 mt-4 mb-4 pb-2'
        v-if="cliente && dateF"
  

>
  
  <v-card-subtitle><v-icon  >mdi-content-cut</v-icon>    {{corte.item.titulo}}</v-card-subtitle>
  <v-card-subtitle><v-icon  >mdi-face-man-shimmer-outline</v-icon>{{cliente}}</v-card-subtitle>
  <v-card-subtitle><v-icon  >mdi-calendar-range</v-icon>{{dateF}}</v-card-subtitle>
  <v-card-subtitle><v-icon  >mdi-currency-brl</v-icon>{{corte.item.valor}},00</v-card-subtitle>
</v-card>


      <v-btn
        :disabled="loading"
        :loading="loading"
        block
        class="text-none mb-4"
        color="light-3"
        size="x-large"
        variant="flat"
        @click="loading = !loading"
        :href=" 'https://api.whatsapp.com/send?phone=559584260691&text=Ol%C3%A1,%20quero%20agendar%20meu%20corte%20de%20cabelo!%0A%0AServiço:%20' + 'Corte ' + corte.item.titulo + '%0A%0A'+ dateF + '%0A' + cliente "
      >
        Confirmar
      </v-btn>

      
      </div>

    </div>
  </div>
</template>

<script>

import barberPic from '@/assets/hairstylist.png'

import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment';
import { userConfig } from '@/stores/user'

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useFirestore, useCollection  } from 'vuefire'

const db = getFirestore(app);
const servicos = useCollection(collection(db, 'servicos'), orderBy('valor'))





export default {
	
	
	
  setup() {
    const store = userConfig()

    return { store }
  },

  computed:{
    dateF() {
     if (this.date){
      return moment(this.date).format("DD/MM/YYYY - hh:mm")
     }
     
   }
  },



  data: () => ({
    loading: false,
    corte: null,
    props: ['modelValue'],
    emits: ['update:modelValue'],
    cliente: '',
    date: '',
    barberPic: barberPic

  })
  ,

  mounted() {
    
  }
  ,
  created() {
    const objeto = JSON.parse(this.$route.params.item)
    console.log(objeto) // Aqui você tem acesso ao objeto enviado da página de origem
    this.corte = objeto
  }
  ,

  
  watch: {
    loading(val) {
      if (!val) return

      setTimeout(() => (this.loading = false), 2000)
    },



  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100&Noto+Sans:wght@700&family=PT+Sans:wght@500&family=Roboto+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;500;700&display=swap');


body,
html {}

.wrapper {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80') no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
  width: 100%;
  max-width: 100vw;
  height: 100%;

  display: flex;
  align-items: center;
  margin-bottom: 0;
}

#container{
  background-color: #282828;
  width: 500px;
/*  height: 500px;*/
  margin: auto;
  align-items: center;
  justify-content: center;

  margin-top: 80px;
  /*margin-bottom: 80px;*/
  border-radius: 10px;
  /*opacity: 0.9;*/
}

.form {
  font-family: 'PT Sans', sans-serif;
  align-items: center;
  /* display: flex; */
  color: #f7efef;
  padding: 20px;
  /* margin-top: 64px; */
  height: 100%;

}

h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 18px;
}

.div1 {
  /*background-color: #3e2723;*/
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-radius: 10px;
  color: #fefefe;
  margin-top: 16px;
}

#barber-name {
  /* background-color: red; */
  /* font-weight: 600; */
  width: 85%;
  font-family: 'PT Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  /* font-style: normal; */
  text-align: left;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

#barber-name small{
	font-weight: 200;
}

#price {
  /* background-color: red; */
  margin-right: 20px;
  font-weight: 100;
  font-family: 'Noto Sans', sans-serif;
}


.div2 {
  background: transparent;
  display: flex;
  justify-content: space-between;
  /*padding: 8px;*/
  border-radius: 10px;
  color: #fefefe;
  margin-top: 16px;
  /* text-transform: uppercase; */
}

.div2 #corte {

  font-family: 'PT Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  /* font-style: normal; */

}

.div2 #time {

  font-weight: 100;
  font-family: 'Noto Sans', sans-serif;

}

#info {
  /* background-color: rgb(51, 12, 65); */

  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 100px;
}

#img{
  height: 45px;
}

@media(max-width: 700px) {
  #container {
    margin: 30px;
    min-width: 100px;
		

  }

  .wrapper{
    padding-top: 20px;
  	max-height: 100vh;
  	max-width: 100vh;
  
  }

}
</style>