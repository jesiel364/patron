import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAWffWJ4pfs8zlufWhX2sX4HhH9DJbzuLY",
  authDomain: "ydajean-barber.firebaseapp.com",
  projectId: "ydajean-barber",
  storageBucket: "ydajean-barber.appspot.com",
  messagingSenderId: "415621886708",
  appId: "1:415621886708:web:b17a8e490276afd26d64a1"
};

export const app = initializeApp(firebaseConfig);
export const firebaseApp = initializeApp(firebaseConfig);