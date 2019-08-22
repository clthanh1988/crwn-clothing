import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { resolve } from 'q';

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

  // document reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // document snapshot
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

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { items, title } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      items,
      title
    };
  });

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
