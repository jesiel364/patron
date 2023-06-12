<template>
 
  	 <div
   
    id="container"
    class="wrapper"
  >
    

    <div class="container">
   
      <v-card  :class="{ dark: store.isDark, light: !store.isDark }" id="content"  class="mx-auto pt-5 ">
      	
      	
      	
      	<v-btn
        v-if="store.isDark"
        @click="colorChange()"
        icon="mdi-weather-sunny"
       
      ></v-btn>
      <v-btn v-else @click="colorChange()" icon="mdi-weather-night" color="black"></v-btn>
        <div class="divs">
          <div class="box">
            <logo_small class='text-center mb-5' id='logo' />
          </div>
          <div class="box">
            <div id="perfil-desc">
              <!-- <p class="font-weight-bold" id="perfil-name">Yda Jean Barbershop</p> -->
              <p class="font-weight-medium" >Nossa barbearia fica no endereço</p>
              <p class="" id="perfil-rua">Rua Curió, 575 - São Bento</p>
            </div>
          </div>
        </div>

        <p id="thead" class="font-weight-black mb-7">Serviços</p>

        <div v-for="item in servicos" class="servicos   mb-3 pb-0">

          <div id="cont-1">

            <p class="font-weight-bold" id="title">{{ item.titulo }}</p>
            <p class='text-subtitle-1' id="time">{{ item.time }}</p>
          </div>

          <div id="cont-2">
            <p id="valor" class="font-weight-bold">R${{ item.valor }},00</p>
            <!-- <v-btn  theme="light"  @click='enviarObjeto({item})' class="ml-8 mt-1 rounded-pill bg-brown" icon><v-icon>mdi-content-cut</v-icon> </v-btn> -->

              <AgendarComp :my-prop='item'/>
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
import Skeleton from '../components/Skeleton.vue'
import AgendarComp from '../components/AgendarComp.vue'

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

    methods: {
      // define(data) {
      //   this.store.setMyObject(data)
      // },
      enviarObjeto(item) {
      this.$router.push({ name: 'agendar', params: { item: JSON.stringify(item) } })
    },
    colorChange(){
    	if(this.store.isDark){
    		this.isDark = false
    		this.store.isDark = false
    	} else {
    		this.isDark = true 
    		this.store.isDark = true
    	}
    	
    }
     
    }
  ,
    components: {

      logo_small,
        messComp,
        AgendarComp,
        Skeleton

    },
    data: () => ({


      message: {
        author: 'Jean Pierre',
        date: '10, Mai 2023',
        mess: 'Funcionamos todos os dias das 8h ás 19h!'
      },
      servicos : servicos,
      isDark: true,
     
    }),
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&family=Lato&display=swap');


.dark{
	background-color: #282828 ;
	color: white;
}
.light{
	background-color: #EFEBE9;
	color: #282828 ;
}

.box {
  /*background-color: blue;*/

  /* width: 100%;
  height: 150px; */
  justify-content: center;
}

.divs {
  display: flex;
  flex-direction: row;
  margin: 20px;
  
}

.wrapper {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80') no-repeat center center;
  background-size: cover;
  align-items: center;

  
  align-items: center;
  padding-top: 20PX;
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
    border-radius: 0;
  }

  .wrapper {
    padding-top: 0;
    width: 100%;
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
    /*background-color: red;*/
  }


}
</style>