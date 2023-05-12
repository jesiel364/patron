<template>
  <div id='cont'>

    <div>
      <logoComp class='text-center' id='logo' />
    </div>



    <v-container>
      <v-row>


        <v-col v-for="item in itens" :key="item.id" cols="6" md="3">
          <v-card to="/agendar" theme="light" @click="define(item)" >
            <v-img :src="item.imagem" height="200"></v-img>
            <v-card-title>{{ item.titulo }}</v-card-title>
            <v-card-subtitle>R${{ item.valor }},00</v-card-subtitle>
            <!-- <v-card-text>{{ item.descricao }}</v-card-text> -->
          </v-card>
        </v-col>{{ store.myObject }}
        <v-btn @click="define()">Enviar</v-btn>
      </v-row>

    </v-container>

  </div>
</template>

<script>
import logoComp from '../components/logoComp.vue'
// import { useStore } from 'pinia'
import { userConfig } from '@/stores/user'
import { ref } from 'vue'

// alert(store)


export default {

  setup() {
    const store = userConfig()
    return { store }


  },

  computed: {

  },

  data() {
    return {
      params: {
        nome: 'store.corte'
      }
      ,
      itens: [
        {
          id: 1,
          titulo: 'Militar',
          valor: 12,
          descricao: 'Descrição do Item 1',
          imagem: 'https://i.pinimg.com/564x/52/76/df/5276dfd89d7f9a674f56c28eb1abe2e0.jpg',
        },
        {
          id: 2,
          titulo: 'Social',
          valor: 15,
          descricao: 'Descrição do Item 2',
          imagem: 'https://i.pinimg.com/564x/b4/1f/f2/b41ff2d4bb920f1545d72292a918f6d8.jpg',
        },
        {
          id: 3,
          titulo: 'Degradê Máquina',
          descricao: 'Descrição do Item 3',
          valor: 20,
          imagem: 'https://www.ocarafashion.com/wp-content/uploads/2021/05/cabelo-colorido-masculino-men-color-hair-style.jpg',
        },
        {
          id: 4,
          titulo: 'Degradê Navalha',
          valor: 25,
          descricao: 'Descrição do Item 4',
          imagem: 'https://thumbs.dreamstime.com/b/sobrancelha-dada-forma-perfeitamente-composi%C3%A7%C3%A3o-permanente-e-tattooing-cosm%C3%A9tico-para-as-sobrancelhas-126169103.jpg',
        },
        {
          id: 5,
          titulo: 'Sobrancelha',
          valor: 10,
          descricao: 'Descrição do Item 4',
          imagem: 'https://thumbs.dreamstime.com/b/sobrancelha-dada-forma-perfeitamente-composi%C3%A7%C3%A3o-permanente-e-tattooing-cosm%C3%A9tico-para-as-sobrancelhas-126169103.jpg',
        },
        {
          id: 6,
          titulo: 'Barba',
          valor: 5,
          descricao: 'Descrição do Item 4',
          imagem: 'https://thumbs.dreamstime.com/b/sobrancelha-dada-forma-perfeitamente-composi%C3%A7%C3%A3o-permanente-e-tattooing-cosm%C3%A9tico-para-as-sobrancelhas-126169103.jpg',
        },

      ],



    }
  },

  components: {
    logoComp,
  },

  methods: {
    define(data) {
        const newObj = {
          id: 1,
          titulo: 'Militar',
          valor: 12,
          descricao: 'Descrição do Item 1',
          imagem: 'https://i.pinimg.com/564x/52/76/df/5276dfd89d7f9a674f56c28eb1abe2e0.jpg',
        }

        this.store.setMyObject(data)
      }
    }
  }





</script>

<style scoped></style>