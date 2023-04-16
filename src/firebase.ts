import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  orderByValue,
  orderByPriority,
  orderByKey,
} from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAnAol8N66cLUr8XEMaQ8j_znVLRfWuC7o',
  authDomain: 'electronic-store-63ba3.firebaseapp.com',
  databaseURL: 'https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'electronic-store-63ba3',
  storageBucket: 'electronic-store-63ba3.appspot.com',
  messagingSenderId: '815760818081',
  appId: '1:815760818081:web:27a406193aeea0cf9e15e0',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase()

const prod = ref(db, 'prodcuts')
console.log(prod)
