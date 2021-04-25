import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBBqNjAy5JhRqP-07jR4157pkcH-kwnPME',
  authDomain: 'dsci551-6a1f7.firebaseapp.com',
  databaseURL: 'https://dsci551-6a1f7-default-rtdb.firebaseio.com',
  projectId: 'dsci551-6a1f7',
  storageBucket: 'dsci551-6a1f7.appspot.com',
  messagingSenderId: '350399250526',
  appId: '1:350399250526:web:9fc2ec74e5c27f5ed374cf',
  measurementId: 'G-BJ1L7RZ625',
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();

// eslint-disable-next-line import/prefer-default-export
export { firebase };
