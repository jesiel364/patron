<script>
import { ref } from "vue";

import { userConfig } from "@/stores/user";
import addServico from "@/components/addServico.vue";
import Editar from "@/components/Editar.vue";
import Menu from "@/components/Menu.vue";
import Users from "@/components/Users.vue";
import AgendarComp from "@/components/AgendarComp.vue";
import photoPic from "@/assets/photo-pic.png";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);
const servicosCol = collection(db, "servicos");
const list = useCollection(servicosCol);

const users = useCollection(collection(db, "users"));

export default {

  computed: {
    noAtivo() {
      // let todos = this.list

      // let ativos = this.ativo
      // const naoAtivos = todos.filter(x => {
      //   return JSON.stringify(ativos).indexOf(JSON.stringify(x)) < 0;
      // });
      // return naoAtivos
    }
  },
  watch: {
    ativo(novo) {

      // novo.forEach((item) => {
      //   if (item.status == false) {
      //     const svc = doc(db, "servicos", item.id);
      //     try {
      //       updateDoc(svc, { status: true });
      //     } catch (error) {
      //       alert(error);
      //     }
      //   }
      // });
      // if (this.noAtivo) {
      //   this.noAtivo.forEach((item) => {
      //     if (item.status == true) {
      //       const svc = doc(db, "servicos", item.id);
      //       try {
      //         updateDoc(svc, { status: false });
      //       } catch (error) {
      //         alert(error);
      //       }
      //     }

      //   });
      // }


    },
  },
  setup() {
    const store = userConfig();
    return { store };
  },
  components: {
    addServico,
    Editar,
    Users,
    AgendarComp,
    Menu,
  },
  data() {
    return {
      servicos: [],
      users: users,
      superUser: false,
      uid: "",
      list: list,
      logado: false,
      res: "",
      photoNull: photoPic,
      alert: true,
      alert2: true,
      mode: "dark",
      ativo: '',
    };
  },

  created() {
    // this.getServicos()
    this.verify();
    this.colorMode();
  },

  methods: {
    setStatus(item) {
      // console.log(item)
      if (item.status == false) {
        const svc = doc(db, "servicos", item.id);
        try {
          updateDoc(svc, { status: true });
          
        } catch (error) {
          alert(error);
        }
      } else {
        const svc = doc(db, "servicos", item.id);
        try {
          updateDoc(svc, { status: false });
        } catch (error) {
          alert(error);
        }
      }
    },
    colorMode() {
      if (this.store.isDark == true) {
        this.mode = "dark";
        this.store.isDark = true;
      } else {
        this.mode = "light";
        this.store.isDark = false;
      }
    },
    verify() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          const uid = user.uid;
          this.uid = uid;
          this.consulta(uid);
          // console.log("logado");
          this.logado = true;
        } else {
          this.logado = false;
        }
      });
    },

    async excluir(id) {
      try {
        deleteDoc(doc(db, "servicos", id));
        // alert('excluido')
      } catch (error) {
        alert(error);
      }
    },

    async consulta(id) {
      const collectionRef = collection(db, "users");

      const q = await query(
        collectionRef,
        where("id", "==", id)
        // orderBy('valor', 'asc')
      );

      const servicos = await getDocs(q);
      servicos.forEach((srv) => {
        const data = srv.data();
        const userId = srv.data().uid;
        this.servicos.push(data);

        if (userId == id) {
          this.store.setMyObject(data);
          // alert(data.superUser)
          if (data.superUser) {
            this.superUser = true;
            // alert(id)
          } else {
            this.superUser = false;
          }
        } else {
          // alert("Não é igual")
        }
      });
    },
  },
};
</script>

<template>
  <div :class="{ dark: store.isDark, light: !store.isDark }" class="wrapper px-5">
    <v-btn class="mt-5 mb-5" v-if="store.isDark" @click="store.isDark = !store.isDark" icon="mdi-weather-sunny"></v-btn>
    <v-btn class="mt-5 mb-5" v-else @click="store.isDark = !store.isDark" icon="mdi-weather-night" color="black"></v-btn>
    <h1 class="pt-3 text-center">Página de administração</h1>

    <div v-if="superUser">
      <div v-if="logado" id="container">
        <!-- <circularProgress /> -->

        <div id="div1">
          <h2>Serviços</h2>
          <!-- <small class="bg-warning" v-for="item in noAtivo">{{ item.titulo }} - {{ item.status }}, </small> -->

          <!--<small class="bg-success" v-for="item in list">{{ item.titulo }} - {{ item.status }}, </small>-->

          <v-table class="rounded" v-bind:theme="mode" height="400px" id="table">
            <thead>
              <tr>
                <th class="text-left">Status</th>
                <th class="text-left">Titulo</th>
                <th class="text-left">Valor</th>
                <th class="text-left">Tempo</th>
                <th class="text-left">Imagem</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item.id">
                <td class="">
                  <v-switch @click="setStatus(item)" :id="item.titulo" v-model="item.status"  color="green" class="mt-2"
                    inset></v-switch>
                </td>
                <td>{{ item.titulo }}</td>
                <td>R${{ item.valor }}</td>
                <td>{{ item.time }}</td>
                <td v-if="item.img != 'undefined' &&
                  item.img != 'null' &&
                  item.img != ''
                  ">
                  <v-avatar theme="success" size="60" rounded="">
                    <v-img :src="item.img" cover></v-img>
                  </v-avatar>
                </td>
                <td v-else>
                  <v-avatar color="" size="60" rounded="">
                    <v-img :src="photoNull" cover></v-img>
                  </v-avatar>
                </td>
                <td class="">

                  <Menu :my-prop="item" />
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <div id="div2" class="">
          <addServico :my-Prop='store.isDark' />
        </div>

        <div id=" " class="card mt-5">
          <Users :my-prop="[users, mode]" />
        </div>
      </div>

      <div id="d-flex" v-else>
        <v-alert v-model="alert2" border="start" variant="tonal" close-label="Close Alert" color="" title="Alerta">
          <p>Area restrita a apenas administradores do site.</p>
          <p>
            Se for um usuário <strong>autorizado</strong>, faça o login clicando
            <router-link to="/login">aqui.</router-link>
          </p>
        </v-alert>
      </div>
    </div>

    <div id="" v-else>
      <div>
        <v-alert v-model="alert" border="start" variant="tonal" close-label="Close Alert" color="alert"
          title="Acesso não permitido">
          <p>Area restrita a apenas administradores do site</p>
          <p>
            Se for um usuário <strong>autorizado</strong>, faça o login clicando
            <router-link to="/login">aqui.</router-link>
          </p>
        </v-alert>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --fundo: #363636;
}

#container {
  min-height: 100vh;

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

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.card {}

.dark {
  background-color: #363636;
  color: #fafafa;
}

.light {
  background-color: #fafafa;
  color: #363636;
}

.tdark {
  background-color: #282828;
  color: white;
}

.tlight {
  background-color: #eeeeee;
  color: #282828;
}

.wrapper {
  height: 100%;
}

@media screen and (min-width: 768px) {
  .card {
    height: 100%;
  }

  #container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    /*    background-color: blue;*/
  }

  #table {
    /*    width: 100%;*/
    /*        background-color: blue;*/
    /*    height: 100%;*/
    max-width: 600px;
  }

  .card {
    @apply mr-5 mb-5;
  }
}

@media screen (min-width: 1024px) {
  #container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .card {
    @apply mr-5 px-5;
  }
}
</style>
