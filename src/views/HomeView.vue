<template>

  <container>
  <div>
    <logoComp class='text-center' id='logo' />
  </div>

</container>

  <v-container>
    <v-row>
      <v-col v-for="item in itens" :key="item.id" cols="6" md="3">
        <v-card href="https://api.whatsapp.com/send?phone=559584260691&text=Ol%C3%A1,%20quero%20agendar%20meu%20corte%20de%20cabelo!">
          <v-img :src="item.imagem" height="200"></v-img>
          <v-card-title>{{ item.titulo }}</v-card-title>
          <!-- <v-card-text>{{ item.descricao }}</v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
import logoComp from '../components/logoComp.vue'

export default {
  data() {
    return {
      itens: [
        {
          id: 1,
          titulo: 'Social',
          descricao: 'Descrição do Item 1',
          imagem: 'https://i.pinimg.com/564x/52/76/df/5276dfd89d7f9a674f56c28eb1abe2e0.jpg',
        },
        {
          id: 2,
          titulo: 'Degradê',
          descricao: 'Descrição do Item 2',
          imagem: 'https://i.pinimg.com/564x/b4/1f/f2/b41ff2d4bb920f1545d72292a918f6d8.jpg',
        },
        {
          id: 3,
          titulo: 'Colorir',
          descricao: 'Descrição do Item 3',
          imagem: 'https://www.ocarafashion.com/wp-content/uploads/2021/05/cabelo-colorido-masculino-men-color-hair-style.jpg',
        },
        {
          id: 4,
          titulo: 'Sobrancelha',
          descricao: 'Descrição do Item 4',
          imagem: 'https://thumbs.dreamstime.com/b/sobrancelha-dada-forma-perfeitamente-composi%C3%A7%C3%A3o-permanente-e-tattooing-cosm%C3%A9tico-para-as-sobrancelhas-126169103.jpg',
        },
      ],
    }
  },
    components: {
    logoComp,
  },
}


</script>

<style scope>
  #logo{
    
/*    justify-content: center;*/
  }

  container{
/*    display: flex;*/
    background-color: blue;
  }
</style>