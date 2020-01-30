import firebase from "firebase"
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCULZa5EQezJklFdCurO4ann_9mk5KyH1M",
    authDomain: "react-carlmartins.firebaseapp.com",
    databaseURL: "https://react-carlmartins.firebaseio.com",
    projectId: "react-carlmartins",
    storageBucket: "react-carlmartins.appspot.com",
    messagingSenderId: "210970498574",
    appId: "1:210970498574:web:725ed31ad2fb7a417d8e5f",
    measurementId: "G-QYSD25WGL5"
  };
  var fire = firebase.initializeApp(firebaseConfig);
  export default fire