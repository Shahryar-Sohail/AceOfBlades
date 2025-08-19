import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc
} from "firebase/firestore";
import { app } from "../../firebase";

interface CartItem {
    id: string; // product id
    title: string;
    price: number;
    quantity: number;
    availableStock: number;
    description: string;
    finalPrice: number;
    imageUrl: string;
    docId?: string; // 👈 Firestore document id (important for delete)
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

// 🔥 Add/Update Cart
export const addToCart = createAsyncThunk(
    "cart/addToCartDB",
    async (item: CartItem) => {
        const db = getFirestore(app);

        const q = query(collection(db, "cart"), where("id", "==", item.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;

            // 👇 instead of always adding, directly overwrite with new quantity
            await updateDoc(docRef, {
                quantity: item.quantity,
            });

            return { ...item, docId: docRef.id };
        } else {
            const docRef = await addDoc(collection(db, "cart"), {
                ...item,
                quantity: item.quantity || 1,
            });
            return { ...item, quantity: item.quantity || 1, docId: docRef.id };
        }
    }
);


// 🔥 Remove from Cart (DB + Redux)
export const removeFromCartDB = createAsyncThunk(
    "cart/removeFromCartDB",
    async (docId: string) => {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "cart", docId));
        return docId;
    }
);

// 🔥 Fetch Cart
export const fetchCartFromDB = createAsyncThunk(
    "cart/fetchCartFromDB",
    async () => {
        const db = getFirestore(app);
        const snapshot = await getDocs(collection(db, "cart"));
        return snapshot.docs.map((d) => ({
            ...(d.data() as CartItem),
            docId: d.id, // 👈 attach firestore docId
        })) as CartItem[];
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const item = action.payload;
            const existing = state.items.find((i) => i.id === item.id);

            if (existing) {
                existing.quantity = item.quantity;
                existing.docId = item.docId; // sync docId
            } else {
                state.items.push(item);
            }
        });

        builder.addCase(fetchCartFromDB.fulfilled, (state, action) => {
            state.items = action.payload;
        });

        builder.addCase(removeFromCartDB.fulfilled, (state, action) => {
            state.items = state.items.filter((i) => i.docId !== action.payload);
        });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
