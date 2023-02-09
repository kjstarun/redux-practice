import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};

export const cartData = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: () => {},
    addItemToCartSuccess: (state, action) => {
      if (action.payload.index === undefined) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[action.payload.index] = action.payload.tempProduct;
      }
    },
    removeQuantity: () => {},
    removeQuantityFromCart: (state, action) => {
      state.cartItems[action.payload.index] = action.payload.tempProduct;
    },
    removeProduct: () => {},
    removeItemFromcart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
    calculateTotal: () => {},
    calculateCartTotalPrice: (state, action) => {
      state.cartTotalPrice = 0;
      state.cartTotalPrice = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItemToCart,
  addItemToCartSuccess,
  removeQuantity,
  removeQuantityFromCart,
  removeProduct,
  removeItemFromcart,
  calculateTotal,
  calculateCartTotalPrice,
  clearCart,
} = cartData.actions;

export default cartData.reducer;
