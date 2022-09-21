// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRdG1Fe3oiyd0ZGUrb0qNriJsuQP7iRNI",
  authDomain: "hd-group-3e018.firebaseapp.com",
  projectId: "hd-group-3e018",
  storageBucket: "hd-group-3e018.appspot.com",
  messagingSenderId: "626170140507",
  appId: "1:626170140507:web:e960286694205b1f982c7e",
  databaseURL: "https://hd-group-3e018-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);