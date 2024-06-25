import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyCJ3Ca7j0QJhfoMC1yLGbgq-bYoqfPpM-E',

  authDomain: 'smartbook-7fc88.firebaseapp.com',

  projectId: 'smartbook-7fc88',

  storageBucket: 'smartbook-7fc88.appspot.com',

  messagingSenderId: '86530932030',

  appId: '1:86530932030:web:75feb068bea01601cc406f',
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
