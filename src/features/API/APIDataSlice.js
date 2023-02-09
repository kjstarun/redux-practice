import { createSlice } from "@reduxjs/toolkit";

const APIData = createSlice({
  name: "APIData",
  initialState: { value: [], isLoading: false },
  reducers: {
    fetchAPIDataOnLoad: (state) => {
      state.isLoading = true;
    },
    setAPIDataSuccess: (state, action) => {
      state.isLoading = false;
      state.value = action.payload.result;
    },
    setAPIDataFailed: (state, action) => {
      state.isLoading = false;
      state.value = action.payload.result;
    },
  },
});

export const { fetchAPIDataOnLoad, setAPIDataFailed, setAPIDataSuccess } = APIData.actions;
export default APIData.reducer;
