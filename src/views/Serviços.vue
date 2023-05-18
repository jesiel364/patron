<template>
  <div class="wrapper">

    <div class="container">
     

      <v-card id="content" theme='dark' class="">
        <div class="divs">
          <div class="box">
            <logo_small class='text-center mb-5' id='logo' />
          </div>
          <div class="box">
            <div id="perfil-desc">
              <p class="font-weight-bold" id="perfil-name">Yda Jean Barbershop</p>
              <p class="" id="perfil-rua">Rua Curió, 575, São Bento</p>
            </div>
          </div>
        </div>

        <p id="thead" class="font-weight-black mb-7">Serviços</p>

        <div v-for="item in servicos" :key="id" class="mb-3 pb-0">

          <div id="cont-1">

            <p class="font-weight-bold" id="title">{{ item.titulo }}</p>
            <p class='text-subtitle-1' id="time">{{ item.time }}min</p>
          </div>

          <div id="cont-2">
            <p id="valor" class="font-weight-bold">R${{ item.valor }},00</p>
            <v-btn :to="{ name: 'agendar', params: { id: item.id } }" theme="light"
              class="ml-8 mt-1 rounded-pill bg-brown">confirmar</v-btn>


          </div>
        </div>


        <messComp :dict="message" />


      </v-card>



    </div>
  </div>
</template>

<script>
  import Logo from '@/assets/logo.png'
import { userConfig } from '@/stores/user'
import logo_small from '../components/logo_sm.vue'
import messComp from '../components/messComp.vue'

import servicos from "../firebase";
import { getDocs, doc, deleteDoc } from "firebase/firestore";

// console.log(servicosRef)



export default {

  setup() {
    const store = userConfig()
    return { store }


  },

 
  



  
    method: {
      define(data) {
        const newObj = {
          id: 1,
          titulo: 'Militar',
          valor: 12,
          descricao: 'Descrição do Item 1',
          imagem: 'https://i.pinimg.com/564x/52/76/df/5276dfd89d7f9a674f56c28eb1abe2e0.jpg',
        }

        this.store.setMyObject(data)
      },

     
  }
  ,
    components: {

      logo_small,
        messComp

    },
    data: () => ({


      message: {

        author: 'Jean Pierre',
        date: '10, Mai 2023',
        mess: 'Funcionamos todos os dias das 8h ás 19h!'

      },
      servicos : servicos
    }),
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&family=Lato&display=swap');

.box {
  /*background-color: blue;*/

  width: 100%;
  height: 150px;
  justify-content: center;
}

.divs {
  display: flex;
  flex-direction: row;
  margin: 20px;
}

.wrapper {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../src/assets/jason-leung-2seUdPQNy_I-unsplash.jpg') no-repeat center center;
  background-size: cover;
  align-items: center;
  display: flex;
  background-color: red;
  align-items: center;
  transform: scale(1.1);
  width: 100%;
  max-width: 100vw;
  height: 100%;
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
  padding: 36px;
  justify-content: center;
  width: 700px;
  /* height: 600px; */
  display: flex;
  flex-direction: column;
  border-top-left-radius: 45px;


}

.container {

  margin: auto;
  justify-content: center;
  align-items: center;
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

  justify-items: space-between;
  align-items: center;
}



#perfil-desc p {

  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  line-height: 20px;

}

#perfil-name {
  
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



@media(max-width: 800px) {
  #content {
    min-width: 100px;
    width: 100%;
  }

  .wrapper {
    margin: 0;
    /* width: 100vw; */
  }

  .divs {
    display: flex;
    flex-direction: column;
  }

  .box {
    margin-top: 30px;

  }

  #perfil-desc {
    margin-top: 20px;
    justify-content: center;
    text-align: center;
    line-height: .5;
  
  }
}
</style>