<template>
	<div  :class="{ dark: store.isDark, light: !store.isDark }" class="wrapper px-5 ">
		
		 <!--<v-btn-->
   <!-- class="mt-5 mb-5"-->
   <!--   v-if="store.isDark"-->
   <!--   @click="store.isDark = !store.isDark"-->
   <!--   icon="mdi-weather-sunny"-->
      
   <!-- ></v-btn>-->
   <!-- <v-btn-->
   <!-- class="mt-5 mb-5" v-else @click="store.isDark = !store.isDark" icon="mdi-weather-night" color="black"></v-btn>-->
		
	<div style="max-width: 400px" class="mx-auto pt-5 " id="container">
	<h1>Meu perfil</h1>
	
  <div class="align-center text-center mt-5">

      <div class="d-flex align-center ml-auto mr-auto" style="background-color: white; width: 100px; height: 100px; border-radius: 100%;">
      <img v-if="store.myObject.photo" class="ml-auto mr-auto" style="width: 90px; height: 90px; border-radius: 100%;" :src="store.myObject.photo" />
      <img v-else class="ml-auto mr-auto" style="width: 90px; height: 90px; border-radius: 100%;" :src="UserPic" />
      
      
    </div>

    <p style="font-size: 24px;" class="mt-5 font-weight-bold">{{store.myObject.name}}</p>
  </div>

  <div>
    <ul>
      <li>Histórico de serviços</li>
      <li>Planos</li>
      <li>Deslogar</li>
    </ul>
  </div>


 {{store.myObject}} 


		
</div>
</div>
</template>

<style scoped >
	.dark {
  background-color: #363636;
  color: white;
}

.light {
  background-color: white;
  color: #282828;
}

#container {
	height: 100vh;
}
</style>

<script>
import UserPic from "@/assets/user.png"
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

const auth = getAuth(app);

export default{

	setup(){
		const store = userConfig()
		return { store }
	},



	data() {
		return {
			email: '',
			UserPic: UserPic,
		}
	},

	methods: {
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