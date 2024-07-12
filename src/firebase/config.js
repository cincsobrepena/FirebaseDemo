import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCkGbG4uHAQ_h0ekKkTlPZwrJL1-poTQAk",
  authDomain: "cs-elec-3.firebaseapp.com",
  projectId: "cs-elec-3",
  storageBucket: "cs-elec-3.appspot.com",
  messagingSenderId: "992377174274",
  appId: "1:992377174274:web:80274a3f6a566ba898ea1b"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  const auth = getAuth();

  export {db, auth}