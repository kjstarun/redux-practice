import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { setAPIDataSuccess, setAPIDataFailed } from "./APIDataSlice";

const fetchAPI = async (url) => {
  const data = await axios.get(url);
  return data.data;
};

function* getAPIfromsaga() {
  try {
    const result = yield fetchAPI("https://fakestoreapi.com/products");
    yield put(setAPIDataSuccess({ result }));
  } catch (err) {
    yield put(setAPIDataFailed({ result: ["No result"] }));
  }
}

export default function* listenAPIRequestFromHome() {
  yield takeLatest("APIData/fetchAPIDataOnLoad", getAPIfromsaga);
}