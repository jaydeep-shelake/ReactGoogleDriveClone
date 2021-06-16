import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDkqGLOfc5JYVZYrICtuIO8DJXEbOX3E2o",
    authDomain: "driveclone-6e9ac.firebaseapp.com",
    projectId: "driveclone-6e9ac",
    storageBucket: "driveclone-6e9ac.appspot.com",
    messagingSenderId: "11817892077",
    appId: "1:11817892077:web:deddbb8ab7b69f6e4774e4"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  const storage =firebase.storage();
  const db = firebase.firestore();
  export{auth,provider,db,storage,app};
  