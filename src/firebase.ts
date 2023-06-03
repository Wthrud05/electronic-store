import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_DATABASE_URL,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_API_ID,
// }

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
