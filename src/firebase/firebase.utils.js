import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB0rtNp_97xj0KR6TYs2XNTBVj-Rff1-Fw",
  authDomain: "crown-db-8fe89.firebaseapp.com",
  databaseURL: "https://crown-db-8fe89.firebaseio.com",
  projectId: "crown-db-8fe89",
  storageBucket: "",
  messagingSenderId: "268801014745",
  appId: "1:268801014745:web:c78a5c4ef1bed474"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (
  userAuth,
  ...additionalData
) => {
  console.log(userAuth);
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // console.log(userRef);
  const snapShot = await userRef.get();
  // console.log(snapShot);

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
    } catch (error) {
      console.log("Error in storing user to database", error.message);
    }
  }
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
