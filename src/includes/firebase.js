import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA7Uhy6JVRiny4l5BeA3fBMyjGVocobmTo",
  authDomain: "my-site-c1432.firebaseapp.com",
  projectId: "my-site-c1432",
  storageBucket: "my-site-c1432.appspot.com",
  appId: "1:847403797349:web:29ab91973bd12be814af8c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const filesCollection = db.collection('BlogFiles');

export {
  auth,
  db,
  filesCollection,
  storage,
};
