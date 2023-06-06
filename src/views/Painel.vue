<script>
import { ref } from "vue";
import AdicionarServico from '@/components/addServico.vue'
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";

import { collection, getDocs, deleteDoc, doc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useFirestore, useCollection  } from 'vuefire'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(app)
const db = getFirestore(app);
const list = useCollection(collection(db, 'servicos'), orderBy('valor'))
const q = query(collection(db, 'servicos'), where("valor", "<", "15"));

let servicos = [];



export default {
  components: {
    AdicionarServico
  }
  ,
  data() {
    return {
      servicos: [],
      list: list,
      logado: false
    };
  },

  created() {
    // this.getServicos()
    this.verify()
  },

  methods: {

      verify(){
        onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log('logado')
    this.logado = true

  } else {
    this.logado = false
  }
})
      },

  async excluir(id){
  try {
   deleteDoc(doc(db, "servicos", id));
   // alert('excluido')
  } catch (error){
    alert(error)
  }
},

  async getServicos() {
    const querySnapshot = await getDocs(collection(db, "servicos"));
    querySnapshot.forEach((doc) => {
   this.servicos.push([doc.id, doc.data()]);
  });

  },

    getServicosShot() {
    onSnapshot(getDocs(db, "servicos"), (snap) => {
      console.log(snap)
    })
  //   querySnapshot.forEach((doc) => {
  //  this.servicos.push([doc.id, doc.data()]);
  // });

  }

  },

};


</script>

<template>
<div class="wrapper px-5">
      <h1 class="pt-3 text-center">Página de administração</h1>
   
<div v-if='logado' id='container'>

  <div  class='card px-2'>


<div id="div1">  
  <h2>Serviços</h2>
  <v-table theme='dark' id='table'>
  
    <thead>
      <tr>
        <!-- <th class="text-left">ID</th> -->
        <th class="text-left">Titulo</th>
        <th class="text-left">Valor</th>
        <th class="text-left">Tempo</th>
        <th class="text-left">Imagem</th>
        <th class="text-left">Ações</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" :key="item.id">
        <!-- <td>{{ item.id }}</td> -->
        <td>{{ item.titulo }}</td>
        <td>R${{ item.valor }}</td>
        <td>{{ item.time }}min</td>
        <td v-if='item.img'><a href=item.img>{{ item.img }}</a></td>
        <td v-else>Nenhuma</td>

        <td class="d-flex align-center">
          <v-btn
            class="mr-2"
            density="compact"
            icon="mdi-pencil"
            color="warning"
          ></v-btn>
          <v-btn @click="excluir(item.id)" density="compact" icon="mdi-delete" color="red"></v-btn>
        </td>

      </tr>
    </tbody>
  </v-table>
</div>

</div>

<div id='div2' class='card '>

  <AdicionarServico />
</div>

<!--   <ul>
    <li v-for="item in list" >
     <span>{{ item.id }} - {{item.titulo}} - {{item.valor}} - {{item.time}}</span>
    </li>
  </ul> -->

</div>

<div id="container" v-else color='alert'>
  <div class="px-2">
  <p>Area restrita a apenas administradores do site</p>
  <p>Se for um usuário autorizado, faça o login clicando <router-link to='/login'>aqui</router-link></p>
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
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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

.wrapper{
  background-color: #363636;
  color: #fafafa;
}


@media screen and (min-width: 768px){
  .card{

      height: 400px;
  }

  #container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;

  }

  #table{
/*    width: 100%;*/
/*    background-color: blue;*/
    height: 400px;
  }

  .card{
    @apply mr-5 mb-5;
  }



}

@media screen (min-width: 1024px){
  #container{
    grid-template-columns: 1fr 1fr 1fr 1fr;

  }
  .card{
    @apply mr-5 px-5;
  }
  

}
</style>