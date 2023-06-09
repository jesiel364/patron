<template>
  <div
    :class="{ dark: store.isDark, light: !store.isDark }"
    id="container"
    class="wrapper px-5"
  >
    <v-btn
    class="mt-5 mb-5"
      v-if="store.isDark"
      @click="store.isDark = !store.isDark"
      icon="mdi-weather-sunny"
      
    ></v-btn>
    <v-btn
    class="mt-5 mb-5" v-else @click="store.isDark = !store.isDark" icon="mdi-weather-night" color="black"></v-btn>

    <h1 class="pt-3">Criar conta</h1>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="pwd.value.value"
        :error-messages="pwd.errorMessage.value"
        label="Senha"
      ></v-text-field>

      <div class="text-center">
        <v-btn color="green" class="me-4" type="submit"> Criar conta </v-btn>
      </div>
      <router-link to="/login">Se já tem um conta, clique aqui.</router-link
      ><br />
    </form>
  </div>
</template>

<script>
import { userConfig } from "@/stores/user";
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export default {
  data() {
    return {
      usuario: [],
      isDark: true,
    };
  },
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "Insira um e-mail válido.";
        },
        pwd(value) {
          if (value?.length > 8 && /[0-9-]+/.test(value)) return true;
          return "A senha precisa";
        },
      },
    });
    
    const store = userConfig()

    const email = useField("email");
    const pwd = useField("pwd");
    const auth = getAuth(app);

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
      createUserWithEmailAndPassword(auth, values.email, values.pwd)
        .then((data) => {
          alert("Usuário registrado com sucesso");
          // this.usuario = data
          console.log(data);
          try {
            const docRef = addDoc(collection(db, "users"), {
              uid: data.user.uid,
              id: data.user.uid,
              name: data.user.displayName,
              email: data.user.email,
              photo: data.user.photoURL,
              phone: data.user.phoneNumber,
              superUser: false,
            });
            // console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
            alert(e);
          }
        })
        .catch((error) => {
          alert(error.message);
          console.log("erro");
        });
    });

    return { email, pwd, submit, handleReset, store };
  },
};
</script>

<style>
.dark {
  background-color: #282828;
  color: white;
}

.light {
  background-color: white;
  color: #282828;
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

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
</style>
