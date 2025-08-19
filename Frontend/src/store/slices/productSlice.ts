import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../firebase";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const db = getFirestore(app);
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});


export const addProduct = createAsyncThunk(
  "products/add",
  async (product: { title: string; description: string; price: number; finalPrice: number; availableStock: number; imageUrl: string }) => {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "products"), product);
    return { id: docRef.id, ...product };
  }
);


export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updatedData }: { id: string; updatedData: any }) => {
    const db = getFirestore(app);
    await updateDoc(doc(db, "products", id), updatedData);
    return { id, ...updatedData };
  }
);


export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "products", id));
    return id;
  }
);

interface ProductState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
