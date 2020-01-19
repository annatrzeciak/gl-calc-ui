// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDQXZNpfc3DeEBRPk_9_nSiaSayjPka20k",
  authDomain: "gl-calculator-470d8.firebaseapp.com",
  databaseURL: "https://gl-calculator-470d8.firebaseio.com",
  projectId: "gl-calculator-470d8",
  storageBucket: "gl-calculator-470d8.appspot.com",
  messagingSenderId: "1078479345743",
  appId: "1:1078479345743:web:c414869167d1d65759b23a",
  measurementId: "G-QK320QFJXR"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
