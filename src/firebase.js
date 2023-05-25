import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2AhM0VBM2gZHgY0HPFFQUfdVYJS9usTI",
  authDomain: "primeiro-projeto-6d3f8.firebaseapp.com",
  databaseURL: "https://primeiro-projeto-6d3f8-default-rtdb.firebaseio.com",
  projectId: "primeiro-projeto-6d3f8",
  storageBucket: "primeiro-projeto-6d3f8.appspot.com",
  messagingSenderId: "1010182689466",
  appId: "1:1010182689466:web:0d684f115e0833de5e2883",
  measurementId: "G-ETP1BX25J2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firebase
const servicosRef = collection(db, "servicos");
const corte = collection(db, "corte");

let prodsSnapShot = await getDocs(servicosRef);
let servicos = [];
prodsSnapShot.forEach((prod) => {
  let prodData = prod.data();
  prodData.id = prod.id;
  servicos.push(prodData);
});

// servicos.forEach(obj => {
//     console.log(obj)
// })

const cortes = []


export default servicos;
