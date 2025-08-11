import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs , deleteDoc , doc } from "firebase/firestore";

export interface FirebaseContextType {
  app: FirebaseApp;
}
const FirebaseContext = createContext<FirebaseContextType | any>(null);
export const useFirebase = () => useContext(FirebaseContext);


const firebaseConfig = {
  apiKey: "AIzaSyDJmBXN06mGvMz6Mu_1OCtw3rqa7NhG5GE",
  authDomain: "theaceofblades-97a30.firebaseapp.com",
  projectId: "theaceofblades-97a30",
  storageBucket: "theaceofblades-97a30.firebasestorage.app",
  messagingSenderId: "116011594266",
  appId: "1:116011594266:web:412e5dbb13d7218a5257a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const FirebaseProvider = (props: any) => {


  const navigate = useNavigate();
  const handleLogin = (e: any, email: string, password: string) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Login successful:", user);
        navigate("/admin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login failed:", errorCode, errorMessage);
      });

  }

  const addProduct = (title: string, description: string, price: number, finalPrice: number, availableStock: number, imageUrl: string) => {
    addDoc(collection(getFirestore(app), "products"), {
      title: title,
      description: description,
      price: price,
      finalPrice: finalPrice,
      availableStock: availableStock,
      imageUrl: imageUrl
    })
      .then(() => {
        console.log("Product added successfully");
        alert("Product Added Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  }


  const getAllProduct = async () => {
    const db = getFirestore(app);
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);

    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,           // ✅ unique key
      ...doc.data()         // ✅ spreads document fields
    }));

    return products;
  }

  const deleteProduct = async (id: string) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "products", id)).then(() => {
      alert("Product Deleted Successfully");
      window.location.reload();
    });
  }



  return (
    <FirebaseContext.Provider value={{ app, handleLogin, addProduct, getAllProduct , deleteProduct }}>
      {props.children}
    </FirebaseContext.Provider>

  )
}