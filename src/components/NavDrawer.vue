<template>
  <div class="wrapper">
    <v-navigation-drawer v-model="drawer" v-bind:theme="mode"
    
      >
      <v-list v-if="user">
          <v-list-item
            
            v-bind:prepend-avatar="Logo"
            title="YdaJean Barber"
            
          ><small>Rua Curió, 575 - São Bento</small>
            <template v-slot:append>

              <UserMenu :myProp='user' />

            </template>
          </v-list-item>
        </v-list>
      <v-list v-else>
        <v-list-item

          title="Yda Jean Barber"
          subtitle="@ydajean - Boa Vista, RR"
        >
          <template v-slot:append> </template>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
      	<!-- <p>{{superUser}}</p> -->
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
          title="Entrar"
        ></v-list-item>
        <v-list-item
        v-if="superUser"
          prepend-icon="mdi-table-cog"
          :to="{ path: '/painel' }"
          title="Painel"
        ></v-list-item>
        <v-list-item
        v-if="logado"
          prepend-icon="mdi-account"
          :to="{ path: '/perfil' }"
          title="Perfil"
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
    <v-app-bar color="brown-darken-2">
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
import Logo from "@/assets/logo.jpg"
import router from "@/router";
import { userConfig } from '@/stores/user'
import UserMenu from '@/components/UserMenu.vue'
import { app } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  getFirestore
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export default {
setup(){
	const store = userConfig()
	return { store }
}

,
  components:{
    UserMenu
  },
  data: () => ({
    Logo: Logo,
    drawer: null,
    logado: false,
    user: '',
    mode: "light",
    theme: '',
    superUser: false,
  }),

  mounted() {
    // this.getServicos()
    this.verify();
    this.getTheme()
  }
  
  ,
  computed: {
  	now(){
  		if(this.store.isDark == true){
  			this.theme = "dark"
  		}else{
  			this.theme = "light"
  		}
  	},
  }
  ,

  methods: {

    async isSuper(id){
      const collectionRef = collection(db, "users");
      const q = await query(
        collectionRef,
        where("id", "==", id)
      );
      const users = await getDocs(q);
      users.forEach((user) => {
        const User = user.data()
        this.store.setMyObject(User)
        // console.log(this.store.myObject)
        this.superUser = User.superUser
      })
    
    }
    ,
  	getTheme(){
  		if(this.store.isDark == true){
  			this.mode = "dark"
  			this.store.isDark = true
  		}else{
  			this.mode = "light"
  			this.store.isDark = false
  		}
  	}
  	,
    verify() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          // console.log("logado");
          this.logado = true;
          this.user = user
          // this.store.setMyObject(user)
          this.isSuper(uid)
          
        } else {
          this.logado = false;
          this.user = ''
        
        }
      });
    },

    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.

          this.logado = false;
          this.user = ''
          this.superUser = false
          this.store.setMyObject({})
          router.push('/login')

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
