<template>
	<div  :class="{ dark: store.isDark, light: !store.isDark }" class="wrapper px-5 ">
		
		 <v-btn
    class="mt-5 mb-5"
      v-if="store.isDark"
      @click="store.isDark = !store.isDark"
      icon="mdi-weather-sunny"
      
    ></v-btn>
    <v-btn
    class="mt-5 mb-5" v-else @click="store.isDark = !store.isDark" icon="mdi-weather-night" color="black"></v-btn>
		
	<div style="max-width: 400px" class="mx-auto pt-5 " id="container">
	<h1>Redefinição de senha</h1>

		<v-text-field label="Digite seu Email" v-model="email"></v-text-field>
		<v-btn :class="{ dark: !store.isDark, light: store.isDark }" @click="redefinirSenha()">Enviar</v-btn>
		
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
			email: ''
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