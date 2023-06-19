<template>
  <div :class="{ dark: store.isDark, light: !store.isDark }" class="wrapper px-5">
    <div  id="container">
      <AlertComp v-if="logado" :my-Prop="[{message: 'Você está logado.', dialog: true}, store.isDark]" />
      <AlertComp v-if="alerta[0]" :my-Prop="[alerta, store.isDark]" />

      <v-btn
      class="mt-5 mb-5"
        v-if="store.isDark"
        @click="store.isDark = !store.isDark"
        icon="mdi-weather-sunny"
        
      ></v-btn>
      <v-btn class="mt-5 mb-5" v-else @click="store.isDark = !store.isDark" icon="mdi-weather-night" color="black"></v-btn>
      <!-- <v-btn @click="colorMode = 'light'">Light Mode</v-btn>    -->

      <div v-if="logado">
        <h1 class="pt-3 text-center">
          Olá {{ user.displayName }}, você está logado!
        </h1>
        <v-avatar :src="user.photoURL"></v-avatar>

        <v-avatar>
          <v-img :src="user.photoURL" alt="John"></v-img>
        </v-avatar>
      </div>
      <div style="max-width: 400px" id="form" class="mx-auto">
        <form style="max-width: 400px;" v-if="!logado" @submit.prevent="submit">
          <h1 class="">Faça o login</h1>
          <strong class="text-red">{{errorMessage}}</strong>

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
            type="password"
          ></v-text-field>

          <v-container class="w-100 m-0 px-0">
            <v-row justify="space-between" class="pr-0 mr-0"  >
              <v-col class=" pl-0
          "   align-self="start"><router-link to="/cadastro">Não tem conta?</router-link></v-col>
              <v-col class=" text-right px-0
          "><router-link class="" to="/redefinir">Esqueceu a senha?</router-link></v-col>
            </v-row>
          </v-container>

          <v-container class="mx-0 px-0">
          	<v-row
             style='max-width: 400px; ' justify="center">
          		<v-col class="ml-0 pl-0">
          			<v-btn :disabled="loading" 
        :loading="loading" color="success" class="me-4" type="submit"> Entrar </v-btn>
          			
          		</v-col>
          		<v-col class="ml-0 pl-0 pr-0 mr-0" >
          			<v-btn
              variant="outlined"
              prepend-icon="mdi-google"
              class="w-100"
              @click="signWithGoogle()"
              >Entrar com o Google</v-btn
            >
          		</v-col>

            
          		
          	</v-row>
          	 
          	
          </v-container>
           
          
        </form>

        <div class="mx-auto text-center mt-3" v-else>
          <v-btn color="success" class="" @click="logout()">Deslogar</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userConfig } from "@/stores/user";
import AlertComp from "@/components/AlertComp.vue";
import router from "@/router";
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
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
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const auth = getAuth(app);



export default {


  components: {
    AlertComp,
  },
  mounted() {
    this.verify();
  },
  data() {
    return {
      logado: false,
      user: "",
      already: false,
      // alerta: { message: "teste", dialog: true },
      isDark: true ,
      loading: false,
      resetLink: ''
    };
  },
  methods: {


    
    async consulta(user) {
      const collectionRef = collection(db, "users");

      const q = await query(
        collectionRef
        // where("uid", "==", id)
        // orderBy('valor', 'asc')
      );

      let isUser = false;

      const servicos = await getDocs(q);
      servicos.forEach((srv) => {
        let userId = srv.data().uid;
        let userEmail = srv.data().email;
        // console.log(user.uid, userId, userEmail)

        if (userId == user.uid) {
          isUser = true;
        }
      });

      if (isUser == false) {
        // alert('Não cadastrado')
        try {
          const docRef = addDoc(collection(db, "users"), {
            uid: user.uid,
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            phone: user.phoneNumber,
            superUser: false,
            configs: {darkMode: true, primaryColor: "brown"}
          });
          // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
          alert(e);
        }
      }
      if (isUser == true) {
        alert("cadastrado");
      }
    },

    verify() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          this.logado = true;
          this.user = user;
          
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          this.logado = false;
          // this.alerta = { message: "N logado", dialog: true };
        }
      });
    },

    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.

          this.logado = false;
          router.push("/");

        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    },

    signWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          // alert(JSON.stringify(user, null, 2))
          this.consulta(user);
          this.user = user;
          this.store.setMyObject(user)

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
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
  },
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "Insira um e-mail válido.";
        },
        pwd(value) {
          if (value?.length >= 8 && /[0-9-a-z]+/.test(value)) return true;

          return "A senha precisa ter no mínimo 8 caracteres.";
        },
      },
    });
    
    const store = userConfig()
    

    const pwd = useField("pwd");
    const email = useField("email");
    const auth = getAuth(app);
    const logado = ref("logado");
    let errorMessage = ref('')
    let alerta = ref('')
   
    let loading = ref(false)
    const submit = handleSubmit((values) => {
      // alert(JSON.stringify(values, null, 2))
       loading.value = true
      signInWithEmailAndPassword(auth, values.email, values.pwd)
        .then((data) => {
          // console.log("success");
          loading.value = false
          setTimeout(() => {
  router.push("/");
}, 3000);
          
        })
        .catch((error) => {
          // alert(ref('alert'))
          console.log(error)
          // loading = true
          loading.value = false

          if(error.code == 'auth/user-not-found'){
            alerta.value = {message: 'Usuário não encontrado.', dialog: true} 
            errorMessage.value = 'Usuário não encontrado.' 
            
          }
          
          
        });
    });

    return { email, pwd, submit, handleReset, store, errorMessage, loading, alerta };
  },
};
</script>

<style scoped>
.dark {
  background-color: #363636 ;
  color: white;
}

.light {
  background-color: white;
  color: #282828;
}

.wrapper {
  /*        background-color: #363636;
        color: #f8f8f8;*/
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
  
  
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media screen (min-width: 768px) {
  .card {
    height: 400px;
  }

  #form {
    @apply mx-auto;
    width: 546px;
    /*    display: flex;*/
    /*    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;*/
  }
}

@media screen (min-width: 1024px) {
  #container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /*       background-color: blue;*/
  }
}
</style>
