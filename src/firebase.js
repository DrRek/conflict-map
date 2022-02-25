import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDLLDmaZK7y0aG9zPTpq-iOLMBFHI4jwo",
  authDomain: "conflict-map-ebde1.firebaseapp.com",
  projectId: "conflict-map-ebde1",
  storageBucket: "conflict-map-ebde1.appspot.com",
  messagingSenderId: "890573882051",
  appId: "1:890573882051:web:83135f769cab3326b1d876",
  measurementId: "G-W5S8P3E2PE"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
      //await addDoc(collection(db, "users"), {
      //  uid: user.uid,
      //  name: user.displayName,
      //  authProvider: "google",
      //  email: user.email,
      //});
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
};