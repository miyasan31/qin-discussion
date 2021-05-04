import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBx3F_ahTBz-1LoMShFwa56CR5VYmkxFU',
  authDomain: 'qin-discussion.firebaseapp.com',
  projectId: 'qin-discussion',
  storageBucket: 'qin-discussion.appspot.com',
  messagingSenderId: '917324162964',
  appId: '1:917324162964:web:a55aa78e213150777a5181',
  measurementId: 'G-5CNRL5M5X1',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
export const strage = firebase.storage();
