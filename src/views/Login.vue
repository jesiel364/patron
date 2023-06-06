<template>
  <div class="wrapper">  <div id='container'>
  <h1 v-if="logado" class="pt-3 text-center">Você está logado!</h1>

  <div id='form' class="mx-3">
    <form v-if="!logado" @submit.prevent="submit">
      <h1>Faça o login</h1>

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="pwd.value.value"
        :counter="0"
        :error-messages="pwd.errorMessage.value"
        label="Senha"
      ></v-text-field>

      <router-link to="/cadastro">Não tem conta?</router-link><br />

      <div class="mt-3 text-center">
        <v-btn color="success" class="me-4 mb-2" type="submit"> Entrar </v-btn>
        
        <v-btn variant="outlined" prepend-icon="mdi-google" class="" @click="signWithGoogle()">Entrar com o Google</v-btn>
      </div>
      
       
    </form>

    <div class="mx-auto text-center mt-3" v-else>
      <v-btn color="success" class="" @click="logout()">Deslogar</v-btn>
    </div>
  </div>
</div>
</div>

</template>

<script>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'
  import { app } from "../firebase";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, getRedirectResult, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

  const auth = getAuth(app)



  export default {
    mounted(){
      this.verify()
    }
    ,
    data(){
      return {
        logado: false
      }

    }
    ,
    methods: {
      verify(){
        onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    this.logado = true

  } else {
    this.logado = false
  }
});
      },

      logout(){

signOut(auth).then(() => {
  // Sign-out successful.

  this.logado = false

}).catch((error) => {
  // An error happened.
    alert(error)
});
      },

      signWithGoogle(){
    const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
        
  },
      
    }
    ,
    setup () {
      const { handleSubmit, handleReset } = useForm({
        validationSchema: {
        email (value) {
            if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Insira um e-mail válido.'
          },
          pwd (value) {
            if (value?.length >= 8 && /[0-9-a-z]+/.test(value)) return true

            return 'A senha precisa ter no mínimo 8 caracteres.'
          },

        },
      })

      const pwd = useField('pwd')
      const email = useField('email')
      const auth = getAuth(app)
      const logado = ref('logado')

      const submit = handleSubmit(values => {
        alert(JSON.stringify(values, null, 2))
         signInWithEmailAndPassword(auth,  values.email, values.pwd)
        .then((data) => {

          console.log("success")


        })
        .catch((error) => {

          alert(error.message)
          console.log("erro")
        })
      })


      return { email, pwd, submit, handleReset }
    },
  }
</script>

<style scoped>
  .wrapper{
        background-color: #363636;
        color: #f8f8f8;

  }


a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }




}

/* color palette from <https://github.com/vuejs/theme> */


*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

#container {
  min-height: 100vh;
  color: var(--color-text);
  background-color: var(--vt-c-black);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media screen and (min-width: 768px){
  .card{

      height: 400px;
  }

  #form{
    @apply mx-auto;
    width: 546px;
/*    display: flex;*/
/*    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;*/



  }



}

@media screen (min-width: 1024px){
  #container{
    grid-template-columns: 1fr 1fr 1fr 1fr;
       background-color: blue;
  }
  

}

</style>
