<template>
  <div :class="{ dark: store.isDark, light: !store.isDark }" class="wrapper px-5">
    <div id="container">
      <AlertComp :my-Prop="alerta" />

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
      <div id="form" class="mx-auto">
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
            type="password"
          ></v-text-field>

          <router-link to="/cadastro">Não tem conta?</router-link><br />

          <v-container>
          	<v-row justify="start">
          		<v-col>
          			<v-btn color="success" class="me-4" type="submit"> Entrar </v-btn>
          			
          		</v-col>
          		<v-col>
          			<v-btn
              variant="outlined"
              prepend-icon="mdi-google"
              class=""
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
      alerta: { message: "teste", dialog: true },
      isDark: true ,
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
          router.push("/");
        } else {
          this.logado = false;
          this.alerta = { message: "N logado", dialog: true };
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

    const submit = handleSubmit((values) => {
      // alert(JSON.stringify(values, null, 2))
      signInWithEmailAndPassword(auth, values.email, values.pwd)
        .then((data) => {
          console.log("success");
          router.push("/");
        })
        .catch((error) => {
          // alert(ref('alert'))
          alert(error.message);
          console.log("erro");
          console.log(alerta.value);
        });
    });

    return { email, pwd, submit, handleReset, store };
  },
};
</script>

<style scoped>
.dark {
  background-color: #282828;
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
  color: var(--color-text);
  background-color: var(--vt-c-black);
  transition: color 0.5s, background-color 0.5s;
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
