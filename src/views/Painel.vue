<script>
import { ref } from "vue";
import addServico from "@/components/addServico.vue";
import Editar from "@/components/Editar.vue";
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
} from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);
const servicosCol = collection(db, "servicos");
const list = useCollection(servicosCol);

const users = useCollection(collection(db, "users"));

export default {
  components: {
    addServico,
    Editar,
    Users,
    AgendarComp,
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
    };
  },

  created() {
    // this.getServicos()
    this.verify();
  },

  methods: {
    verify() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          this.uid = uid;
          this.consulta(uid)
          console.log("logado");
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
        const data = srv.data()
        const userId = srv.data().uid
        if (userId == id){
        	// alert(data.superUser)
        	if( data.superUser){
        		this.superUser = true
        		// alert(id)
        	} else{
        		this.superUser = false
        	}
        } else{
        	// alert("Não é igual")
        }
      });
    },
  },
};
</script>

<template>
  <small>{{ res }}</small>
  <div class="wrapper px-5">
    <h1 class="pt-3 text-center">Página de administração</h1>

    <div v-if="logado" id="container">
    
        <div v-if="superUser">
          <div class="card px-2">
            <div id="div1">
              <h2>Serviços</h2>
              <v-table theme="dark" id="table">
                <thead>
                  <tr>
                    <!-- <th class="text-left">ID</th> -->
                    <th class="text-left">Ações</th>
                    <th class="text-left">Titulo</th>
                    <th class="text-left">Valor</th>
                    <th class="text-left">Tempo</th>
                    <th class="text-left">Imagem</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list" :key="item.id">
                    <!-- <td>{{ item.id }}</td> -->
                    <td class="d-flex align-center">
                      <Editar :my-prop="item" />
                      <v-btn
                        class="ml-2"
                        @click="excluir(item.id)"
                        density="compact"
                        icon="mdi-delete"
                        color="red"
                      ></v-btn>
                    </td>
                    <td>{{ item.titulo }}</td>
                    <td>R${{ item.valor }}</td>
                    <td>{{ item.time }}</td>
                    <td
                      v-if="
                        item.img != 'undefined' &&
                        item.img != 'null' &&
                        item.img != ''
                      "
                    >
                      <v-avatar color="grey" size="60" rounded="">
                        <v-img :src="item.img" cover></v-img>
                      </v-avatar>
                    </td>
                    <td v-else>
                      <v-avatar color="grey" size="60" rounded="">
                        <v-img :src="photoNull" cover></v-img>
                      </v-avatar>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>

            <Users :my-prop="users" />
          </div>

          <div id="div2" class="card">
            <addServico />
          </div>
        </div>

        
        <div v-else>
            <v-alert
              v-model="alert2"
              border="start"
              variant="tonal"
              closable
              close-label="Close Alert"
              color="error"
              title="Alerta"
            >
              <p>Area restrita a apenas administradores do site</p>
          <p>Se for um usuário <strong>autorizado</strong>, faça o login clicando <router-link to='/login'>aqui.</router-link></p>

            </v-alert>

    
          </div>
      
    </div>

    <div id="container" v-else>
      <div>
        <v-alert
          v-model="alert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          color="error"
          title="Acesso não permitido"
        >
          <p>Area restrita a apenas administradores do site</p>
          <p>
            Se for um usuário <strong>autorizado</strong>, faça o login clicando
            <router-link to="/login">aqui.</router-link>
          </p>
        </v-alert>

        <div v-if="!alert" class="text-center">
          <v-btn @click="alert = true"> Reset </v-btn>
        </div>
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
  color: var(--color-text);
  background: var(--fundo);
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

.card {
}

.wrapper {
  background-color: #363636;
  color: #fafafa;
}

@media screen and (min-width: 768px) {
  .card {
    height: 100%;
  }

  #container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
  }

  #table {
    /*    width: 100%;*/
    /*    background-color: blue;*/
    height: 100%;
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
