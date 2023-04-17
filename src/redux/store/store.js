import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/contactSlice";

export const store = configureStore({
  reducer: {
    contactSlice: counterReducer,
  },
});
