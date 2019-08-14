import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDud24fGBBZKbia3eUn6J4VJlNbUopukVw',
  authDomain: 'crwn-db-96a83.firebaseapp.com',
  databaseURL: 'https://crwn-db-96a83.firebaseio.com',
  projectId: 'crwn-db-96a83',
  storageBucket: '',
  messagingSenderId: '60475216465',
  appId: '1:60475216465:web:3b3ebc17fead6abf'
};

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
