<template>
  <h1 v-if="logado" class="pt-3 text-center">Você está logado!</h1>

  <div id='container' class="mx-3">
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
        <v-btn color="success" class="me-4" type="submit"> Entrar </v-btn>
        
        <v-btn variant="outlined" prepend-icon="mdi-google" class="" @click="signWithGoogle()">Entrar com o Google</v-btn>
      </div>
      
       
    </form>

    <div class="mx-auto mt-3 d-flex" v-else>
      <v-btn color="success" class="" @click="logout()">Deslogar</v-btn>
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
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

/* color palette from <https://github.com/vuejs/theme> */
:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */


@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
  }
}

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
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
