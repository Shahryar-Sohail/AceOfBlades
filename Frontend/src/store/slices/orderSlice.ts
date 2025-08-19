import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { app } from "../../firebase";

const db = getFirestore(app);

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  houseNo: string;
  apartment: string;
  townCity: string;
  province: string;
  postalCode: string;
  phone: string;
}

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  finalPrice: number;
  availableStock: number;
  imageUrl: string;
  quantity: number;
}

interface OrderState {
  customer: Customer;
  cartItems: CartItem[];
  total: number;
  shippingCost: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    houseNo: "",
    apartment: "",
    townCity: "",
    province: "",
    postalCode: "",
    phone: ""
  },
  cartItems: [],
  total: 0,
  shippingCost: 0,
  loading: false,
  error: null
};

export const fetchLatestOrder = createAsyncThunk("orders/fetchLatest", async () => {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, orderBy("createdAt", "desc"), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const data = snapshot.docs[0].data();
  return {
    customer: data.customer || {},
    cartItems: data.cartItems || [],
    total: data.total || 0,
    shippingCost: data.shipping.cost || 0
  };
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLatestOrder.pending, state => {
        state.loading = true;
      })
      .addCase(fetchLatestOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.customer = action.payload.customer;
          state.cartItems = action.payload.cartItems;
          state.total = action.payload.total;
          state.shippingCost = action.payload.shippingCost;
        } else {
          state.customer = initialState.customer;
          state.cartItems = [];
          state.total = 0;
          state.shippingCost = 0;
        }
      })
      .addCase(fetchLatestOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export default orderSlice.reducer;
