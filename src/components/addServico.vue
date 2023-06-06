<template>

<div class="mx-3">
  <h2 class="px-3">
      Adicionar serviço
</h2>
  <form @submit.prevent="submit">
  

    <v-text-field
      v-model="titulo.value.value"
      :error-messages="titulo.errorMessage.value"
      label="Titulo"
    ></v-text-field>
    
       <v-text-field
      v-model="preco.value.value"
      :error-messages="preco.errorMessage.value"
      label="Valor"
      type='number'
    ></v-text-field>

          <v-text-field
      v-model="tempo.value.value"
      :error-messages="tempo.errorMessage.value"
      label="Tempo estimado"
    ></v-text-field>

              <v-text-field
      v-model="img.value.value"
      :error-messages="img.errorMessage.value"
      label="Imagem"
      type='url'

    ></v-text-field>


 

    <v-btn
      class="me-4"
      type="submit"
    >
      Adicionar serviço
    </v-btn>

    <v-btn @click="handleReset">
      Limpar
    </v-btn>
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
    setup () {
      const { handleSubmit, handleReset } = useForm({
        validationSchema: {
         
          titulo (value) {
            if (value) return true

            return 'Insira um titulo'
          },
          preco (value) {
            if (value?.length < 8 && /[0-9-]+/.test(value)) return true
            return "Insira um preço"
          },
          tempo (value) {
            if (value?.length < 3 && /[0-9-]+/.test(value)) return true
            return "Campo obrigatório"
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
              time: Number(values.tempo),
              img: Number(values.img)
            });
            // console.log("Document written with ID: ", docRef.id);
           
          } catch (e) {
            console.error("Error adding document: ", e);
            alert(e)
          }
      })

      return { titulo, preco, tempo, img, submit, handleReset }
    },

    methods:{
      async addServico(){

      }
    }
  }
</script>

<style>
</style>