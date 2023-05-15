import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAGY453Oh_7oMO89pICPgfdAnxzj4RPs44',
  authDomain: 'trivial-puessi.firebaseapp.com',
  databaseURL: 'https://trivial-puessi-default-rtdb.firebaseio.com',
  projectId: 'trivial-puessi',
  storageBucket: 'trivial-puessi.appspot.com',
  messagingSenderId: '716992599411',
  appId: '1:716992599411:web:ae9af93bd2c9f5bb9de106',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
