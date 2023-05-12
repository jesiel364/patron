<template>
  <div class="wrapper">

    <div class="container">


      <v-card id="content" class="mx-auto mt-5 ">
        <div class="" id="perfil">
          <logo_small class='text-center mb-5' id='logo' />
          <div id="perfil-desc">
            <p class="font-weight-bold" id="perfil-name">Yda Jean Barbershop</p>
            <p class="" id="perfil-rua">Rua Curió, 575, São Bento</p>
          </div>
        </div>

        <p id="thead" class="font-weight-black mb-7">Serviços</p>

        <div v-for="item in items" :key="id" class="servicos   mb-3 pb-0">

          <div  id="cont-1">

            <p class="font-weight-bold" id="title">{{ item.titulo }}</p>
            <p class='text-subtitle-1' id="time">{{ item.time }}min</p>
          </div>

          <div id="cont-2">
            <p id="valor" class="font-weight-bold">R${{ item.valor }},00</p>
            <v-btn to="/agendar" theme="light" @click="define(item)" class="ml-8 mt-1 rounded-pill bg-brown">confirmar</v-btn>


          </div>
        </div>

        <div class="message bg-brown">
          <div>
            <span id="author">{{ message.author }}</span>
            <span id="date">{{ message.date }}</span>
          </div>

          <div>
            <p id="mess">{{ message.mess }}</p>
          </div>

        </div>



      </v-card>
    </div>
  </div>
</template>

<script>
import { userConfig } from '@/stores/user'
import logo_small from '../components/logo_sm.vue'

export default {

  setup() {
    const store = userConfig()
    return { store }


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
  ,
  components: {

    logo_small,

  },
  data: () => ({


    items: [
        {
          id: 1,
          titulo: 'Militar',
          valor: 12,
          descricao: 'Descrição do Item 1',
          imagem: 'https://i.pinimg.com/564x/52/76/df/5276dfd89d7f9a674f56c28eb1abe2e0.jpg',
          time: 10
        },
        {
          id: 2,
          titulo: 'Social',
          valor: 15,
          descricao: 'Descrição do Item 2',
          imagem: 'https://i.pinimg.com/564x/b4/1f/f2/b41ff2d4bb920f1545d72292a918f6d8.jpg',
          time: 15
        },
        {
          id: 3,
          titulo: 'Degradê Máquina',
          descricao: 'Descrição do Item 3',
          valor: 20,
          imagem: 'https://www.ocarafashion.com/wp-content/uploads/2021/05/cabelo-colorido-masculino-men-color-hair-style.jpg',
          time: 25
        },
        {
          id: 4,
          titulo: 'Degradê Navalha',
          valor: 25,
          descricao: 'Descrição do Item 4',
          imagem: 'https://thumbs.dreamstime.com/b/sobrancelha-dada-forma-perfeitamente-composi%C3%A7%C3%A3o-permanente-e-tattooing-cosm%C3%A9tico-para-as-sobrancelhas-126169103.jpg',
          time: 30
        },
        {
          id: 5,
          titulo: 'Sobrancelha',
          valor: 10,
          descricao: 'Descrição do Item 4',
          imagem: 'https://thumbs.dreamstime.com/b/sobrancelha-dada-forma-perfeitamente-composi%C3%A7%C3%A3o-permanente-e-tattooing-cosm%C3%A9tico-para-as-sobrancelhas-126169103.jpg',
          time: 3
        },
        {
          id: 6,
          titulo: 'Barba',
          valor: 5,
          descricao: 'Descrição do Item 4',
          imagem: 'https://thumbs.dreamstime.com/b/sobrancelha-dada-forma-perfeitamente-composi%C3%A7%C3%A3o-permanente-e-tattooing-cosm%C3%A9tico-para-as-sobrancelhas-126169103.jpg',
          time: 5
        },

      ],
    message: {

      author: 'Jean Pierre',
      date: '10, Mai 2023',
      mess: 'Funcionamos todos os dias das 8h ás 19h!'

    }
  }),
}
</script>

 


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&family=Lato&display=swap');

html,
body,
.wrapper,
.containner {
  width: 100%;
  max-width: 100vw;
  height: 100%;
  padding: 0;
  margin: 0;

}

body {}

.wrapper {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../src/assets/jason-leung-2seUdPQNy_I-unsplash.jpg') no-repeat center center;
  /* background-size: cover; */
  background-color: red;
}

#perfil-rua,
p {
  font-family: 'Lato', sans-serif;

}

.servicos {
  /* background-color:grey; */
  display: flex;
  justify-content: space-between;
  border-radius: 22px;
  margin-bottom: 16px;

}

#content {
  padding: 16px;
  justify-content: center;
  width: 700px;
  /* height: 600px; */
  display: flex;
  flex-direction: column;
  border-top-left-radius: 45px;

}

.container {
  padding: 10px;

}



#cont-1 {
  display: flex;
  flex-direction: column;

  /* background-color: green; */
  /* vertical-align: middle; */

}

#cont-2 {
  display: flex;
  /* background-color: green; */
  flex-direction: row;
  justify-content: space-between;

}

#valor {
  /* line-height: 3; */
  display: flex;
  margin-top: 10px;

}

v-btn {
  display: flex;
  margin-top: 20px;

}

#time,
#title {
  /* background-color: green; */
  margin-top: 10px;
  display: flex;


}

#time {
  /* background-color: green; */
  line-height: 5px;
  font-size: 10px;
}

#thead {
  font-family: 'Lato', sans-serif;
  font-size: 20px;

}

#perfil {

  margin: auto;
  display: flex;
  flex-direction: row;
  justify-items: space-between;
  align-items: center;
}



#perfil-desc p {

  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  line-height: 20px;

}

#perfil-name {
  color: #282828;
}

#perfil-rua,
#time {
  color: grey;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
}

#perfil-desc {
  /* background-color: aqua; */
  margin-left: 20px;
  display: flex;
  flex-direction: column;

}

.message {
  /* background-color: brown; */
  margin-top: 42px;
  padding: 16px;
  border-radius: 25px;
}

.message p {
  /* color: #fefefe; */
}

#author {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #fefefe;
}

#date {
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 200;
  color: #dfdfdf;
  padding-left: 16px;
}

#mess {
  /* font-family: 'Lato', sans-serif; */
  font-size: 14px;
  font-weight: 200;
  color: #fefefe;
  padding-top: 10px;
}

@media(max-width: 800px) {
  #content {
    min-width: 100px;
    width: 380px;
  }

}
</style>