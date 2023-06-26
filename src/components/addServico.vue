<template>
  <div class="mt-3">
    <h2 class="px-2 mb-5 mt-5">
      Adicionar serviço
    </h2>
    <form @submit.prevent="submit">


      <v-text-field v-model="titulo.value.value" :error-messages="titulo.errorMessage.value" label="Titulo"
        prepend-icon="mdi-format-title" clearable variant="outlined"></v-text-field>

      <v-text-field v-model="preco.value.value" :error-messages="preco.errorMessage.value" label="Valor" type='number'
        prefix="R$" step="0.01" prepend-icon="mdi-cash" clearable variant="outlined"></v-text-field>

      <v-select prepend-icon="mdi-clock" clearable theme="dark" v-model="tempo.value.value"
        :error-messages="tempo.errorMessage.value" label="Tempo estimado"
        :items="['5min', '10min', '15min', '30min', '1h', '2h']" variant="outlined"></v-select>

      <v-card :theme="theme"  class="mb-5">
        <v-tabs v-model="tab" bg-color="brown-darken-2">
          <v-tab prepend-icon="mdi-upload" value="photo-upload">Upload</v-tab>
          <v-tab prepend-icon="mdi-link" value="photo-url">Url</v-tab>

        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="photo-upload">
              <v-file-input class="mt-2" label="Enviar foto" variant="outlined" prepend-icon="mdi-camera"></v-file-input>
            </v-window-item>

            <v-window-item value="photo-url">
              <v-text-field prepend-icon="mdi-link" v-model="img.value.value" :error-messages="img.errorMessage.value"
                label="Imagem" class="mt-2" type='url' placeholder="https://example.com/imagem.png" clearable
                variant="outlined"></v-text-field>
            </v-window-item>



          </v-window>
        </v-card-text>
      </v-card>





      <div>

        <v-btn class="me-4" type="submit">
          Adicionar serviço
        </v-btn>

        <v-btn id="button" @click="handleReset">
          Limpar
        </v-btn>
      </div>
    </form>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useField, useForm, defineRule } from 'vee-validate'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);
const auth = getAuth(app)

export default {
  computed: {
    theme(){
      if (this.myProp){
        return 'dark'
      } else{
        return 'light'
      }
    }
  },

  data() {
    return {
      tab: null,
    }
  },

  props:{
    myProp: {
      type: Object,
      required: false
    }
  },

  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {

        titulo(value) {
          if (value) return true

          return 'Insira um titulo'
        },
        preco(value) {
          if (value?.length < 8 && /[0-9-]+/.test(value)) return true
          return "Insira um preço"
        },
        tempo(value) {
          if (value) return true
          return 'Escolha um item'

        },


      },
    })

    const titulo = useField('titulo')
    const preco = useField('preco')
    const tempo = useField('tempo')
    const img = useField('img')


    const submit = handleSubmit(values => {

      // alert(JSON.stringify(values, null, 2))
      try {
        const docRef = addDoc(collection(db, "servicos"), {
          titulo: values.titulo,
          valor: Number(values.preco),
          time: String(values.tempo),
          img: String(values.img)
        });
        // console.log("Document written with ID: ", docRef.id);

      } catch (e) {
        console.error("Error adding document: ", e);
        alert(e)
      }
    })

    return { titulo, preco, tempo, img, submit, handleReset }
  },

  methods: {
    async addServico() {

    },

    addNewUser() {

    }
  }
}
</script>

<style>
@media screen and (max-width: 436px) {
  #button {
    /*      @apply mt-2;*/
  }
}
</style>