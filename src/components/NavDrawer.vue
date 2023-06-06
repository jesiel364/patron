<template>
  <div class="wrapper">
    <v-navigation-drawer v-model="drawer" theme="dark"
      ><v-list>
        <v-list-item
          title="Yda Jean Barber"
          subtitle="@ydajean - Boa Vista, RR"
        >
          <template v-slot:append> </template>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-home"
          :to="{ path: '/' }"
          title="Inicio"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-chair-rolling"
          :to="{ path: '/servicos' }"
          title="Serviços"
        ></v-list-item>
        <v-list-item
          v-if="!logado"
          prepend-icon="mdi-account"
          :to="{ path: '/login' }"
          title="Login"
        ></v-list-item>
        <v-list-item
        v-if="logado"
          prepend-icon="mdi-table-cog"
          :to="{ path: '/painel' }"
          title="Painel"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-if="logado"
          prepend-icon="mdi-logout"
          title="Deslogar"
          @click="logout()"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="brown">
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-btn @click="drawer = !drawer" icon>
        <!-- <v-icon>mdi-razor-double-edge</v-icon> -->
        <v-icon>mdi-content-cut</v-icon>
      </v-btn>

      <!-- <v-toolbar-title class="text-subtitle-8 font-weight-black">Yda Jean Barber</v-toolbar-title> -->
    </v-app-bar>
  </div>
</template>

<script>
import { app } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth(app);

export default {
  data: () => ({
    drawer: null,
    logado: false,
  }),

  created() {
    // this.getServicos()
    this.verify();
  },

  methods: {
    verify() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("logado");
          this.logado = true;
        } else {
          this.logado = false;
        }
      });
    },

    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.

          this.logado = false;
        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 300px;
}
</style>
