import { all, fork } from "redux-saga/effects";
import listenAPIRequestFromHome from "../features/API/APIDataSaga";
import listenCartRequestfromUser from "../features/Cart/cartDataSaga";

export default function* rootSaga() {
  yield all([
    fork(listenAPIRequestFromHome),
    fork(listenCartRequestfromUser),
  ]);
}
