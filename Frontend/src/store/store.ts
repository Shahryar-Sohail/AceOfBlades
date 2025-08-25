import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import authReducer from "./slices/authSlice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    auth: authReducer,
    contacts: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
