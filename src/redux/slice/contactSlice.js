import { contact } from "@/constants/contact";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactData: contact,
};

export const contactSlice = createSlice({
  name: "contactData",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contactData = action.payload;
    },
  },
});

export const { addContact } = contactSlice.actions;

export default contactSlice.reducer;
