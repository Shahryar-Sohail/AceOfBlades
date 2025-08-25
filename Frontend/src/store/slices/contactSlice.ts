import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

interface ContactData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactState {
  list: ContactData[];
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: ContactState = {
  list: [],
  status: "idle",
};

// async thunk for Firestore submit
export const submitContact = createAsyncThunk(
  "contacts/submitContact",
  async (formData: Omit<ContactData, "id">) => {
    const docRef = await addDoc(collection(db, "contacts"), formData);
    return { id: docRef.id, ...formData }; // add Firestore id
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(submitContact.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default contactSlice.reducer;
