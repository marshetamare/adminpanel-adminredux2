import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAcbVNigBQarSp8NzLwjlGLJYqc_RTvC00",
    authDomain: "kin-auth.firebaseapp.com",
    projectId: "kin-auth",
    storageBucket: "kin-auth.appspot.com",
    messagingSenderId: "105627531431",
    appId: "1:105627531431:web:2b8fa230199e4ad52e4382"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();