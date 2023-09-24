import CartSlice from '../action/cart-action';
import { configureStore } from "@reduxjs/toolkit";

export const cartStore=configureStore({
  reducer:{
    cart:CartSlice
  }
});