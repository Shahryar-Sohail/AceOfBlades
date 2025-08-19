import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy, limit, getDoc } from "firebase/firestore";

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
const db = getFirestore(app);

export const getCheckoutDetails = async () => {
  const db = getFirestore(app);
  const checkoutRef = collection(db, "checkout");

  const q = query(checkoutRef, orderBy("createdAt", "desc"), limit(1)); // latest doc
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const lastDoc = querySnapshot.docs[0];
  const data = lastDoc.data();

  // const cartItems = await getAllCartProduct();

  return {
    items: data.cartItems || [],
    total: data.totalPrice,
    shippingCost: data.shippingCost,
  };
};
export const checkOutForm = async (formData: any) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), formData);
    console.log("Order submitted with ID: ", docRef.id);
    alert("Order submitted successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to submit order.");
  }
};
export const listenCartCount = (callback: (count: number) => void) => {
  const db = getFirestore(app);
  return onSnapshot(collection(db, "cart"), (snapshot) => {
    callback(snapshot.size);
  });
};

export const addProduct = (title: string, description: string, price: number, finalPrice: number, availableStock: number, imageUrl: string) => {
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

// export const FirebaseProvider = (props: any) => {

//   const db = getFirestore(app);


//   const navigate = useNavigate();
//   const handleLogin = (e: any, email: string, password: string) => {
//     e.preventDefault();
//     const auth = getAuth(app);
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log("Login successful:", user);
//         navigate("/admin");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error("Login failed:", errorCode, errorMessage);
//       });

//   }

//   const getAllProduct = async () => {
//     const db = getFirestore(app);
//     const productsRef = collection(db, "products");
//     const querySnapshot = await getDocs(productsRef);

//     const products = querySnapshot.docs.map(doc => ({
//       id: doc.id,           // ✅ unique key
//       ...doc.data()         // ✅ spreads document fields
//     }));

//     return products;
//   }

//   const deleteProduct = async (id: string) => {
//     const db = getFirestore(app);
//     await deleteDoc(doc(db, "products", id)).then(() => {
//       alert("Product Deleted Successfully");
//       window.location.reload();
//     });
//   }

//   const updateProduct = async (id: string, updatedData: any) => {
//     const db = getFirestore(app);
//     await updateDoc(doc(db, "products", id), updatedData).then(() => {
//       alert("Product Updated")
//       window.location.reload();
//     });

//   };

//   const getAllCartProduct = async () => {
//     const db = getFirestore(app);
//     const productsRef = collection(db, "cart");
//     const querySnapshot = await getDocs(productsRef);

//     const products = querySnapshot.docs.map(doc => ({
//       id: doc.id,           // ✅ unique key
//       ...doc.data()         // ✅ spreads document fields
//     }));

//     return products;
//   }

//   const addToCart = async (product: any) => {
//     try {
//       await addDoc(collection(getFirestore(app), "cart"), {
//         title: product.title,
//         description: product.description,
//         price: product.price,
//         finalPrice: product.finalPrice,
//         availableStock: product.availableStock,
//         imageUrl: product.imageUrl
//       });
//       // alert("Product added to cart successfully");
//       console.log("Product added to cart successfully");

//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const deleteCartItem = async (id: string, refreshCart: () => void) => {
//     const db = getFirestore(app);
//     await deleteDoc(doc(db, "cart", id)).then(() => {
//       alert("Product Deleted Successfully from Cart");
//       refreshCart();
//     });
//   };

//   const fetchProduct = async (id: string): Promise<any | null> => {
//     const docRef = doc(db, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data(); // return the product
//     } else {
//       return null;
//     }
//   };

//   const updateCartProduct = async (
//     id: string,
//     updatedData: { quantity: number },
//     unitFinalPrice: number // per-unit discounted price
//   ) => {
//     const db = getFirestore(app);

//     const qty = Number(updatedData.quantity) || 1;
//     const totalPrice = unitFinalPrice * qty;

//     await updateDoc(doc(db, "cart", id), {
//       quantity: qty,
//       finalPrice: unitFinalPrice, // per-unit stays same
//       totalPrice: totalPrice      // total changes with qty
//     });

//     alert(`Cart updated: Qty ${qty}, Total Price ${totalPrice}`);
//   };

//   const getOrderDetails = async () => {
//     const db = getFirestore(app);
//     const ordersRef = collection(db, "orders");

//     const q = query(ordersRef, orderBy("createdAt", "desc"), limit(1)); // latest doc
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) return null;

//     const lastDoc = querySnapshot.docs[0];
//     const data = lastDoc.data();

//     // const cartItems = await getAllCartProduct();

//     return {
//       items: data.cartItems || [],
//       total: data.total,
//       shippingCost: data.shipping.cost,
//       customer: data.customer || [],
//     };
//   };

//   return (
//     <FirebaseContext.Provider value={{ app, handleLogin, addProduct, getAllProduct, deleteProduct, updateProduct, getAllCartProduct, addToCart, listenCartCount, deleteCartItem, updateCartProduct, getCheckoutDetails, fetchProduct, checkOutForm, getOrderDetails }}>
//       {props.children}
//     </FirebaseContext.Provider>

//   )
// }