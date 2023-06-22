<tamplate>



<!--{{store}}-->
<!--{{setHistoric}}-->
	
</tamplate>
<script>
import { userConfig } from "@/stores/user";
import { app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
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
import { useFirestore, useCollection, } from "vuefire";

const db = getFirestore(app);
const historic = collection(db, "agenda")
const list = useCollection(historic);
const auth = getAuth(app);

export default{
	setup(){
		const store = userConfig()
		return { store }
	},
	
	data(){
		return {
			user: "",
			mode: 'dark'
		}
	},
	

  computed:{
    setHistoric(){
      let servico = this.list
      let historic = servico.filter(item => item.cliente.id == this.user.uid)
      let all = servico.filter(item => item)
      // console.log(localStorage.theme)
      return all
    },

    colorMode(){
      if(this.store.isDark == true){
        this.mode = "dark"
        this.store.isDark = true
        localStorage.setItem('theme', "dark")
        return 'dark'

      } else{
        this.mode = "light"
        this.store.isDark = false
        localStorage.setItem('theme', "light")
        return 'light'

      }
        
      }
  },
  
  methods:{
  	
    verify() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("logado");
          this.logado = true;
          this.user = user
          // this.store.setMyObject(user)
          
          
        } else {
          this.logado = false;
          this.user = false
        
        }
      });
    }, 
  },
  
  created(){
  	this.verify()
  }
}
</script>
<style scoped></style>
