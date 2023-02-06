import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishListItems: [],
};

export const wishDataSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemtoWishlist: (state, actions) => {},
    removeItemfromWishList: (state, actions) => {},
    addItemtoCart: (state, actions) => {},
  },
});

export const {addItemtoWishlist, removeItemfromWishList, addItemtoCart} = wishDataSlice.actions
export default wishDataSlice.reducer