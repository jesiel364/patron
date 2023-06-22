<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <template v-slot:activator="{ props }">
      <v-list-item-title v-bind="props" >Editar</v-list-item-title>
      <!-- <v-btn class="mx-auto mt-4 mr-1 bg-white"  v-bind="props" icon="mdi-pencil"></v-btn> -->
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Informações</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Titulo"
                v-model="myProp.titulo"
                required
                clearable
              ></v-text-field>
              <p></p>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="myProp.valor"
                label="Preço"
                prefix="R$"
                type="number"
                step="0.01"
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12">
    <v-select
  clearable
  v-model="myProp.time"
  label="Tempo estimado"
  :items="['5min', '10min', '15min', '30min', '1h', '2h']"
  variant="solo-inverted"
></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Imagem (opcional)"
                type="url"
                v-model="myProp.img"
                clearable
              >
              </v-text-field>
            </v-col>

          </v-row>
        </v-container>
        <!--<small>{{myProp}}</small>-->
        <small>*Preencha os campos</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Fechar
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="Editar()">
          Atualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { collection, getDocs, doc, query, where, setDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useFirestore, useCollection  } from 'vuefire'
import { app } from "@/firebase";

const db = getFirestore(app);
const servicos = useCollection(collection(db, 'servicos'))

  export default {
    data: () => ({
      dialog: false,
    }),
    props: {
    myProp: {
      type: Object,
      required: true
    }
  },

  methods: {
  Editar(){
  		// alert(JSON.stringify(this.myProp, null, 2))
  		const svc = doc(db, "servicos", this.myProp.id);
		try {
			updateDoc(svc, this.myProp);
		}catch(error){
			alert(error)
		}
		this.dialog = false
		 
  	}
  }
  }
</script>
