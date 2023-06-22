<template>
	<!-- {{servicos}} -->
	
        <div v-for="item in servicos" class="servicos   mb-3 pb-0">

          <div id="cont-1">

            <p class="font-weight-bold" id="title">{{ item.titulo }}</p>
            <p class='text-subtitle-1' id="time">{{ item.time }}</p>
          </div>

          <div id="cont-2">
            <p id="valor" class="font-weight-bold">R${{ item.valor }},00</p>

              <AgendarComp :my-prop='item'/>
          </div>
        </div>


</template>

<script>
import AgendarComp from '../components/AgendarComp.vue'
import { ref } from 'vue'
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { useFirestore, useCollection  } from 'vuefire'
const db = getFirestore(app);

const servicos = await useCollection(collection(db, 'servicos'), orderBy('valor'))
export default{


async setup(){

	
	const getArticle = async () => {
		await new Promise(resolve => setTimeout(resolve, 3000))
		
		
		
}


await getArticle()

return { servicos }

	},

	components:{
		AgendarComp
	}
}
	

</script>

<style scoped>
		section{
		max-width: 100%;
/*		height: 100vh;*/

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center ;
		background-color: #363636;
		margin: 0;
	}


.servicos {
  /* background-color:grey; */
  display: flex;
  justify-content: space-between;
  border-radius: 22px;
  margin-bottom: 16px;

}
</style>