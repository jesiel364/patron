<template>
  <div id="container">
    <div class='wrapper'>


      <div class="form">

        <h2>Minha Reserva</h2>


        <div class="div1">
          <v-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
          </v-avatar>
          <div id="barber-name">
            <p>Jean Pierre</p>
          </div>

          <div id='price'>
            <p>R${{ corte }},00</p>
          </div>

        </div>

        <div class="div2">
          <v-avatar color="grey" size="150" rounded="0">
            <v-img cover :src="store.myObject.imagem"></v-img>
          </v-avatar>
          <div id="info">
            <p id='corte'>{{ corte }}</p>
            <p id='time'>{{ corte }}min</p>
          </div>



        </div>

        <div class="mx-auto text-center">

          <VueDatePicker class="mb-2 mt-5" locale="pt-BR" v-model="date" week-numbers="iso"></VueDatePicker>

          <v-btn class="mt-auto mb-0">Confirmar</v-btn>
          <!-- <button :click="filterObjectById(2)">Filtrar por ID</button> -->
        </div>


        <!-- 
        <v-card-title class="py-5 text-center font-weight-black">{{ store.myObject.titulo }}</v-card-title>

        <div class="text-center">

        </div>

        <div class="">

          <v-card-text>

            <strong>Segunda</strong> - das 8h às 19h <br>
            <strong>Terça</strong> - das 8h às 19h <br>
            <strong>Quarta</strong> - das 8h às 19h <br>
            <strong>Quinta</strong> - das 8h às 19h <br>
            <strong>Sexta</strong> - das 8h às 19h <br>
            <strong>Sábado</strong> - das 8h às 19h <br>
            <strong>Domingo</strong> - das 8h às 19h <br>

          </v-card-text>
          <div class="ms-3 me-3">
            <v-select label="Selecione o serviço" v-model="corte" :items="items" multiple>


            </v-select>








            

          </div>
          <v-card-text>
            <div class="text-subtitle-2 font-weight-black mb-1">Seu nome</div>

            <v-text-field label="" single-line variant="outlined" v-model="cliente"></v-text-field>



            <v-btn :disabled="loading" :loading="loading" block class="text-none mb-4" color="indigo-darken-3"
              size="x-large" variant="flat" @click="loading = !loading"
              :href="'https://api.whatsapp.com/send?phone=559584260691&text=Ol%C3%A1,%20quero%20agendar%20meu%20corte%20de%20cabelo!%0A%0AServiço:%20' + corte + '%0A%0A' + dateF + '%0A' + cliente">
              Confirmar
            </v-btn>

            <v-btn block class="text-none" color="grey-lighten-3" size="x-large" variant="flat" :to="{ path: '/' }">
              Cancelar
            </v-btn>
          </v-card-text>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png'
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment';
import { userConfig } from '@/stores/user'
import servicos from "../firebase";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";


const store = userConfig()



export default {
  // setup() {
  //   const store = userConfig()

  //   return { store }
  // },




  data: () => ({
    loading: false,
    Logo: Logo,
    items: [
      { id: 1, title: 'Corte social', valor: 20 },
      { id: 2, title: 'Corte degradê', valor: 25 },
      { id: 3, title: 'Colorir cabelo', valor: 50 },
      { id: 4, title: 'Fazer sobrancelhas', valor: 10 },
    ],
    corte: null,
    props: ['modelValue'],
    emits: ['update:modelValue'],
    cliente: '',
    date: ''

  })
  ,

  methods: {


    // const getFirestoreData = async () => {
    //   const querySnapshot = await getDocs(servicos);
    //   querySnapshot.forEach((doc) => console.log(doc.data()))

    },

  

    //  servicos.forEach(obj => {
    //   if( obj.id === this.$route.params.id ){
    //     // console.log(obj.titulo)

    //     this.corte = obj
    //   }

    //  })

  }
  ,
  computed: {
    dateF() {

      return moment(this.date).format("DD/MM/YYYY - hh:mm")
    }

  },

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

#container {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../src/assets/allef-vinicius-IvQeAVeJULw-unsplash.jpg') no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
  width: 100%;
  max-width: 100vw;
  height: 100%;
  /* height: 100vw; */

  display: flex;
  align-items: center;
}

.wrapper {
  background-color: #795548;
  width: 500px;
  height: 500px;
  margin: auto;
  align-items: center;
  justify-content: center;

  margin-top: 80px;
  margin-bottom: 80px;
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
  background-color: #3e2723;
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
  padding-left: 10px;
}

#price {
  /* background-color: red; */
  margin-right: 20px;
  font-weight: 100;
  font-family: 'Noto Sans', sans-serif;
}


.div2 {
  background-color: #3e2723;
  display: flex;
  justify-content: space-between;
  padding: 8px;
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

@media(max-width: 700px) {
  .wrapper {
    margin: 30px;
    min-width: 100px;


  }
}
</style>