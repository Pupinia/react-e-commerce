import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBBb0yEMkx2yYOUpw44D4RYi0nU68cT-0Y",
  authDomain: "e-commerce-react-83e99.firebaseapp.com",
  databaseURL: "https://e-commerce-react-83e99.firebaseio.com",
  projectId: "e-commerce-react-83e99",
  storageBucket: "e-commerce-react-83e99.appspot.com",
  messagingSenderId: "792514715751",
  appId: "1:792514715751:web:5df62912081f69229c34c2",
  measurementId: "G-V2X8SBWR1C"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
