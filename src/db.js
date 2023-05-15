import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCmKVDx1mprzpSowa1kBOL9Wp4TWZd2g_w',
  authDomain: 'quiz-io-9b3c8.firebaseapp.com',
  projectId: 'quiz-io-9b3c8',
  storageBucket: 'quiz-io-9b3c8.appspot.com',
  messagingSenderId: '609365470195',
  appId: '1:609365470195:web:8ca2c5f6cc1701caf88086',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
