import { configureStore } from "@reduxjs/toolkit";
import APIData from "./APIData";
import CartData from "./cartData";

export default configureStore({
  reducer: {
    APIData,
    CartData,
  },
});
