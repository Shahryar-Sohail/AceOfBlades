import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, query, orderBy, limit, getDocs, addDoc, doc, updateDoc, writeBatch } from "firebase/firestore";

interface CartItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  finalPrice: number;
  totalPrice?: number;
  availableStock: number;
}

interface CheckoutState {
  cartItems: CartItem[];
  total: number;
  shippingCost: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CheckoutState = {
  cartItems: [],
  total: 0,
  shippingCost: 0,
  status: "idle",
};



export const fetchCheckout = createAsyncThunk(
  "checkout/fetchCheckout",
  async () => {
    const checkoutRef = collection(db, "checkout");
    const q = query(checkoutRef, orderBy("createdAt", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const lastDoc = querySnapshot.docs[0];
    const data = lastDoc.data();

    return {
      items: data.cartItems || [],
      total: data.totalPrice,
      shippingCost: data.shippingCost,
    };
  }
);

export const submitCheckout = createAsyncThunk(
  "checkout/submitCheckout",
  async (formData: any) => {
    try {
      const docRef = await addDoc(collection(db, "orders"), formData);
      console.log("Order submitted with ID: ", docRef.id);
      // alert("Order submitted successfully!");
      const batch = writeBatch(db);

      for (const CartItem of Object.values(formData.cartItems)) {
        const item = CartItem as CartItem;
        const productRef = doc(db, "products", item.id);
        batch.update(productRef, {
          availableStock: item.availableStock,
        });
      }

      await batch.commit(); // ✅ all updates sent in one go
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit order.");
    }
  }
);

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCheckout.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload?.items || [];
        state.total = action.payload?.total || 0;
        state.shippingCost = action.payload?.shippingCost || 0;
      })
      .addCase(fetchCheckout.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default checkoutSlice.reducer;
