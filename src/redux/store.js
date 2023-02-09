import createSagaMiddleware from "@redux-saga/core";
import { configureStore, current } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import APIDataSlice from "../features/API/APIDataSlice";
import cartDataSlice from "../features/Cart/cartDataSlice";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    APIData: APIDataSlice,
    CartData: cartDataSlice,
  },
  middleware: (currentMiddleware) => [
    ...currentMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);
