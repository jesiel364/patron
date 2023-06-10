<template>
	<h1>Redefinição de senha</h1>

		<v-text-field label="Digite seu Email" v-model="email"></v-text-field>
		<v-btn @click="redefinirSenha()">Enviar</v-btn>
</template>

<script>
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