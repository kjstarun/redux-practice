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
    addItemToCart: (state, actions) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === actions.payload.id
      );

      if (index >= 0) {
        state.cartItems[index].quantity += 1;
        state.cartItems[index].subTotal =
          state.cartItems[index].quantity * state.cartItems[index].price;
      } else {
        let currentData = { ...actions.payload };
        currentData.quantity = 1;
        currentData.subTotal = actions.payload.price;
        state.cartItems = [currentData, ...state.cartItems];
      }
    },
    removeQuantityFromCart: (state, actions) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === actions.payload.id
      );
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
      } else {
        state.cartItems.splice(index, 1);
      }
      if (state.cartItems.length > 0) {
        state.cartItems[index].subTotal =
          state.cartItems[index].quantity * state.cartItems[index].price;
      }
    },

    removeItemFromcart: (state, actions) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === actions.payload.id
      );
      state.cartItems.splice(index, 1);
    },

    calculateCartTotalPrice: (state) => {
      console.log("total price called");
      state.cartTotalPrice = 0;
      state.cartItems.map((item) => {
        state.cartTotalPrice += item.subTotal;
      });
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItemToCart,
  removeQuantityFromCart,
  removeItemFromcart,
  calculateCartTotalPrice,
  clearCart,
} = cartData.actions;

export default cartData.reducer;
