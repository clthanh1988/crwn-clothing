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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log(err, 'error creating user');
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
