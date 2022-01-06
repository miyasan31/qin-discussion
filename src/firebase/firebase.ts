import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const strage = firebase.storage();
export const FirebaseTimestamp = firebase.firestore.Timestamp;

export type SnapshotType = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
export type DocumentsType = firebase.firestore.DocumentChange<firebase.firestore.DocumentData>;
export type DocumentType = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
