import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig:FirebaseOptions = {
  apiKey: "AIzaSyC5jRcbVkmniHg-PG2NJPg_hmuiTHJjCEI",
  authDomain: "weatherapp-caa64.firebaseapp.com",
  projectId: "weatherapp-caa64",
  storageBucket: "weatherapp-caa64.appspot.com",
  messagingSenderId: "541573202033",
  appId: "1:541573202033:web:6bd0691abfe00196ccdbd0",
  measurementId: "G-BHCMKGZSPR"
};

const firebaseApp:any = initializeApp(firebaseConfig);
export default getFirestore(firebaseApp);