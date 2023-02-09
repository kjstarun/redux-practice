import { put, select, takeLatest } from "redux-saga/effects";
import {
  addItemToCartSuccess,
  calculateCartTotalPrice,
  removeItemFromcart,
  removeQuantityFromCart,
} from "./cartDataSlice";

const indexFinder = (data, actions) => {
  return data.findIndex((item) => item.id === actions.payload.id);
};

function* addItemusingSaga(actions) {
  try {
    const { cartItems } = yield select((state) => state.CartData);
    const index = indexFinder(cartItems, actions);
    if (index >= 0) {
      let tempProduct = { ...cartItems[index] };
      tempProduct.quantity += 1;
      tempProduct.subTotal = tempProduct.quantity * tempProduct.price;
      yield put(addItemToCartSuccess({ tempProduct, index }));
    } else {
      let tempProduct = { ...actions.payload };
      tempProduct.quantity = 1;
      tempProduct.subTotal = tempProduct.price;
      yield put(addItemToCartSuccess(tempProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

function* removeQuantityusingsaga(actions) {
  try {
    const { cartItems } = yield select((state) => state.CartData);
    const index = indexFinder(cartItems, actions);
    const tempProduct = { ...cartItems[index] };
    tempProduct.quantity -= 1;
    tempProduct.subTotal = tempProduct.quantity * tempProduct.price;
    yield put(removeQuantityFromCart({ tempProduct, index }));
  } catch (error) {
    console.log(error);
  }
}

function* removeProductusingsaga(actions) {
  try {
    const { cartItems } = yield select((state) => state.CartData);
    const index = indexFinder(cartItems,actions);
    yield put(removeItemFromcart(index));
  } catch (error) {
    console.log(error);
  }
}

function* calculateTotalPrice() {
  const { cartItems } = yield select((state) => state.CartData);
  let total = 0;
  cartItems.map((item) => {
    total += item.subTotal;
  });
  yield put(calculateCartTotalPrice(total));
}

export default function* listenCartRequestfromUser() {
  yield takeLatest("cart/addItemToCart", addItemusingSaga);
  yield takeLatest("cart/removeQuantity", removeQuantityusingsaga);
  yield takeLatest("cart/removeProduct", removeProductusingsaga);
  yield takeLatest("cart/calculateTotal", calculateTotalPrice);
}
