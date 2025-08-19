import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCheckoutDetails, checkOutForm } from "../../firebase"; 

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
        const data = await getCheckoutDetails();
        return data;
    }
);

export const submitCheckout = createAsyncThunk(
    "checkout/submitCheckout",
    async (formData: any) => {
        await checkOutForm(formData);
        return formData;
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
