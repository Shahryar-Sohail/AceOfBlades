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
    doc,
    onSnapshot,
    getDoc
} from "firebase/firestore";
import { app } from "../../firebase";

interface CartItem {
    id: string;
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
    error: string | null;
}

const initialState: CartState = {
    items: [],
    error: null,
};

export const listenCartCount = (callback: (count: number) => void) => {
    const db = getFirestore(app);
    return onSnapshot(collection(db, "cart"), (snapshot) => {
        callback(snapshot.size);
    });
};

export const addToCart = createAsyncThunk(
    "cart/addToCartDB",
    async (item: CartItem) => {
        const db = getFirestore(app);

        const q = query(collection(db, "cart"), where("id", "==", item.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            const currentData = querySnapshot.docs[0].data() as CartItem;

            const newQuantity = (currentData.quantity || 0) + 1;

            await updateDoc(docRef, { quantity: newQuantity });

            return { ...item, quantity: newQuantity, docId: docRef.id };
        } else {
            const docRef = await addDoc(collection(db, "cart"), {
                ...item,
                quantity: item.quantity || 1,
            });
            return { ...item, quantity: item.quantity || 1, docId: docRef.id };
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async (
        { docId, quantity }: { docId: string; quantity: number },
        { rejectWithValue }
    ) => {
        try {
            const db = getFirestore(app);
            const ref = doc(db, "cart", docId);

            const snapshot = await getDoc(ref);
            if (!snapshot.exists()) {
                return rejectWithValue("Product not found in cart");
            }

            const product = snapshot.data();

            // check stock
            if (quantity > product.availableStock) {
                return rejectWithValue(" ❌ Out of stock");
            }

            // update only if within stock
            await updateDoc(ref, { quantity });

            return { docId, quantity };
        } catch (error) {
            return rejectWithValue("Something went wrong while updating cart")
        }
    }
);


export const removeFromCartDB = createAsyncThunk(
    "cart/removeFromCartDB",
    async (docId: string) => {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "cart", docId));
        return docId;
    }
);

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
                // alert("✔ Product Updated Successfully" + ("Qty: " + existing.quantity));
            } else {
                state.items.push(item);
                // alert("✔ Product Added Successfully")
            }
        });

        builder.addCase(fetchCartFromDB.fulfilled, (state, action) => {
            state.items = action.payload;
        });

        builder.addCase(removeFromCartDB.fulfilled, (state, action) => {
            state.items = state.items.filter((i) => i.docId !== action.payload);
        });
        builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
            const { docId, quantity } = action.payload;
            const existing = state.items.find((i) => i.docId === docId);

            if (existing) {
                existing.quantity = quantity;
            }
        })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                const errorMsg = action.payload || "❌ Out of stock";
                state.error = errorMsg as string;
                alert(errorMsg); // 👈 directly show popup
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
