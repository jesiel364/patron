<template>
  <v-card
    class="mx-auto"
    elevation="1"
    max-width="500"
  >
    <v-card-title class="py-5 font-weight-black">Agende seu corte de cabelo aqui</v-card-title>

      <div class="text-center">
    <img  id='logo' :src="Logo" alt="Logo do meu aplicativo">
  </div>

  <div class="text-center">
  
    <v-menu location="end">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          dark
          v-bind="props"
        >
          Selecione seu corte
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title @click='escolha(item)'>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

    <v-card-text>
      
      <strong>Segunda</strong> - das 8h às 19h <br>
      <strong>Terça</strong> - das 8h às 19h <br>
      <strong>Quarta</strong> - das 8h às 19h <br>
      <strong>Quinta</strong> - das 8h às 19h <br>
      <strong>Sexta</strong> - das 8h às 19h <br>
      <strong>Sábado</strong> - das 8h às 19h <br>
      <strong>Domingo</strong> - das 8h às 19h <br>

    </v-card-text>

    <v-card-subtitle>
      {{corte.title }} - R${{corte.valor}},00
    </v-card-subtitle>

    <v-card-text>
      <div class="text-subtitle-2 font-weight-black mb-1">Seu Nome</div>

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
        :href=" 'https://api.whatsapp.com/send?phone=559584260691&text=Ol%C3%A1,%20quero%20agendar%20meu%20corte%20de%20cabelo!%0A%0ACorte:%20' + corte.title + '%0A%0ADia%2007/05/2023%0ANome:%20' + cliente "
      >
        Confirmar
      </v-btn>

      <v-btn
        block
        class="text-none"
        color="grey-lighten-3"
        size="x-large"
        variant="flat"
      >
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import Logo from '@/assets/logo.png'

  export default {
    data: () => ({
      loading: false,
      Logo: Logo,
      items: [
        { title: 'Social', valor: 20 },
        { title: 'Degrade', valor: 25 },
        { title: 'Colorir' },
        { title: 'Sobrancelha' },
      ],
      corte: [
                { title: 'Social', valor: 20}
                ],
      props: ['modelValue'],
      emits: ['update:modelValue'],
      cliente: 'Cliente'
    }),

    methods: {
      escolha(corte){
        this.corte.title = corte.title
        this.corte.valor = corte.valor
      }
    }
    ,

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