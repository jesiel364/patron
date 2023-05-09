<template>
  <v-card
    class="mx-auto"
    elevation="1"
    max-width="500"
  >
    <v-card-title class="py-5 text-center font-weight-black">Agende seu corte de cabelo aqui</v-card-title>

      <div class="text-center">
    <img  id='logo' :src="Logo" alt="Logo do meu aplicativo">
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
  <!--<v-option v-for="item in items" :value="item">{{ item.title}} - R${{ item.valor}},00</v-option>-->
  
   
</v-select>
<!-- <v-card-text v-for="i in corte" class="mt-2 mb-1">
      {{i}}
      
    </v-card-text> -->
    

  

        
   
    
      <VueDatePicker  class="mb-2 mt-2" locale="pt-BR" v-model="date" week-numbers="iso" 
    ></VueDatePicker>
    

    
</div>
    <v-card-text>
      <div class="text-subtitle-2 font-weight-black mb-1">Seu nome</div>

      <v-text-field
        label=""
        single-line
        variant="outlined"
        
        
         v-model="cliente"
      ></v-text-field>

     

      <v-btn
        :disabled="loading"
        :loading="loading"
        block
        class="text-none mb-4"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"
        @click="loading = !loading"
        :href=" 'https://api.whatsapp.com/send?phone=559584260691&text=Ol%C3%A1,%20quero%20agendar%20meu%20corte%20de%20cabelo!%0A%0AServiço:%20' + corte + '%0A%0A'+ dateF + '%0A' + cliente "
      >
        Confirmar
      </v-btn>

      <v-btn
        block
        class="text-none"
        color="grey-lighten-3"
        size="x-large"
        variant="flat"
        :to="{path: '/'}"
      >
        Cancelar
      </v-btn>
    </v-card-text>
    </div>
  </v-card>
</template>

<script>
  import Logo from '@/assets/logo.png'
  import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
 import moment from 'moment';





  export default {
    data: () => ({
      loading: false,
      Logo: Logo,
      items: [
        { id: 1, title: 'Corte social', valor: 20 },
        { id: 2, title: 'Corte degradê', valor: 25 },
        { id: 3, title: 'Colorir cabelo', valor: 50 },
        { id:4, title: 'Fazer sobrancelhas', valor: 10 },
      ],
      corte: null,
      props: ['modelValue'],
      emits: ['update:modelValue'],
      cliente: '',
      date : ''
      
    }),

    methods: {
      escolha(corte){
        this.corte.title = corte.title
        this.corte.valor = corte.valor
        
      }
    }
    ,
computed: {
   dateF() {
     
     return moment(this.date).format("DD/MM/YYYY - hh:mm")
   }
    
    },

    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>

<style scoped>
  #logo{
    height: 350px;
 
  }
</style>