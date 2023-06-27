<template>
	<div  :class="{ dark: store.isDark, light: !store.isDark }" class="wrapper px-5 pb-5">
		
		 <v-btn
    class="mt-5 mb-5"
      v-if="store.isDark"
      @click="store.isDark = !store.isDark"
      icon="mdi-weather-sunny"
      
    ></v-btn>
    <v-btn
    class="mt-5 mb-5" v-else @click="store.isDark = !store.isDark" icon="mdi-weather-night" color="black"></v-btn>
		
	<div style="max-width: 500px" class="mx-auto pt-5 mb-5" id="container">

	
  <div class="align-center d-flex mb-5">

      <div class="d-flex align-center ml-auto mr-5" style="background-color: white; width: 95px; height: 95px; border-radius: 100%;">
      <img v-if="store.myObject.photo" class="ml-auto mr-auto" style="width: 95%; height: 95%; border-radius: 100%;" :src="store.myObject.photo" />
      <img v-else class="ml-auto mr-auto" style="width: 90px; height: 90px; border-radius: 100%;" :src="UserPic" />
      
      
    </div>
    <div style="width: 70%;">

    <p style="font-size: 24px;" class="mt-5 mb-2 font-weight-bold">{{store.myObject.name}}</p>
      <v-card :theme="colorMode" variant="tonal" class=" mb-2">
    <v-card-text class="d-flex">
      <div class="d-inline">
    <span class="mdi mdi-email">{{store.myObject.email}}</span><br>

    <span v-if="store.myObject.phone" class="mdi mdi-account">{{store.myObject.phone}}</span>
</div>

<editarPerfil :my-prop="store.myObject" />
  </v-card-text>

</v-card>
</div>

  </div>
 <hr>
  <div>
<br>


    <ul>

      <li>Histórico de serviços</li>
      <!-- <small>{{user.uid}}</small> -->
      <v-card variant="tonal" :theme="colorMode" class="px-5 mb-2" v-for="item in list">
      <template v-slot:text v-if="item.cliente.id == user.uid"  class="d-flex" ><span class="mdi mdi-content-cut mr-auto">{{item.servico.titulo}}</span> <span class="mdi mdi-calendar">{{item.servico.dia}}</span></template>
      <!-- <li>Planos</li> -->
    </v-card>
           
     
    </ul>
  </div>

<v-card variant="tonal" v-for="item in setHistoric" :theme="colorMode" class="mb-5">
  <v-card-title>{{item.servico.titulo}}</v-card-title>
<v-card-text >R${{item.servico.valor}} <br><span class="mdi mdi-calendar"></span>{{item.servico.dia}}</v-card-text>

<small v-for="item in buscaImg">{{ item }}</small>
<v-card-actions>
  <v-btn color='white' class="bg-success">Efetuado</v-btn>
  <v-btn  @click="excluir(item.id)" color='red'>Cancelado</v-btn>
</v-card-actions>

</v-card>
		

     <li class="mt-2">Deslogar</li>
</div>
</div>
</template>

<style scoped >

li{
  list-style: none;
  font-weight: 700;
}

 .verde{
  color: springgreen;
 }

 .normal{
  color: white;
 }
  




#container {
  min-height: 100vh;
	height: 100%;

}
</style>

<script>
import UserPic from "@/assets/user.png"
import editarPerfil from "../components/editarPerfil.vue";
import { userConfig } from "@/stores/user";
import { app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  getFirestore
} from "firebase/firestore";
import { useFirestore, useCollection, } from "vuefire";

const db = getFirestore(app);
const historic = collection(db, "agenda")
const servicosCol = collection(db, "servicos")
const servicos = useCollection(servicosCol);
const list = useCollection(historic);
const auth = getAuth(app);

export default{

  components:{
    editarPerfil
  },
  computed:{
    buscaImg() {
      let agenda = this.list
      let servico = this.servicos
      let res = []

      let servicoTitle = agenda.filter(item => {
        servico.filter(el => {
          let x = (el.titulo == item.servico.titulo)
          if(!x){
            console.log()
          }else{
            console.log('x')
          }
        })

      })
      let img = servico.filter(item => {
        let titulo = agenda.forEach(elemento => {
          let res = elemento.servico.titulo
          return res
          
        })
        return item.titulo.match(titulo)
        
      
      })  
      return res
    },

    setHistoric(){
      let servico = this.list
      let historic = servico.filter(item => item.cliente.id == this.user.uid)
      let all = servico.filter(item => item)
      console.log(all)
      return historic
    },

    colorMode(){
      if(this.store.isDark == true){
        this.mode = "dark"
        this.store.isDark = true
        localStorage.setItem('theme', "dark")
        return 'dark'

      } else{
        this.mode = "light"
        this.store.isDark = false
        localStorage.setItem('theme', "light")
        return 'light'

      }
        
      }
  },

	setup(){
		const store = userConfig()
		return { store }
	},

  created(){
    this.verify()
  }
  ,



	data() {
		return {
			email: '',
			UserPic: UserPic,
      cor: 'white',
      list: list,
      servicos: servicos,
      user: '',
      mode: 'dark'
		}
	},

	methods: {
    async excluir(id) {
      // alert('excluir')
      try {
        deleteDoc(doc(db, "agenda", id));
        // alert('excluido')
      } catch (error) {
        alert(error);
      }
    },

    verify() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("logado");
          this.logado = true;
          this.user = user
          // this.store.setMyObject(user)
          
          
        } else {
          this.logado = false;
          this.user = false
        
        }
      });
    },

	redefinirSenha(){
      
        sendPasswordResetEmail(auth, this.email)
          .then(() => {
            // Password reset email sent!
            alert("E-mail de redefinição de senha enviado!")
            // ..
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
          });
          }
	}
}
</script>