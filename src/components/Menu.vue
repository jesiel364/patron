<template>
 <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item value="1">
                <!-- <v-list-item-title >{{myProp}}</v-list-item-title> -->
                <!-- <v-list-item-title >{{item.time}}</v-list-item-title> -->
                <Editar :my-prop="item" />
              </v-list-item>              

              <v-list-item value="2">
                <v-list-item-title @click="excluir(item.id)">Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

</template>
<script>
import Editar from "@/components/Editar.vue";
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
const db = getFirestore(app);

  export default {

  methods:{
    async excluir(id) {
      try {
        deleteDoc(doc(db, "servicos", id));
        // alert('excluido')
      } catch (error) {
        alert(error);
      }
    },
  },

  computed: {
    item(){
      return this.myProp
    }
  },

    props: {
    myProp: {
      type: Object,
      required: true
    }
  },

    components:{
      Editar
    },

    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],

      
    }),
  }
</script>