import { createSlice } from "@reduxjs/toolkit";

const APIData = createSlice({
  name: "counter",
  initialState: { value: [] },
  reducers: {
    setAPIData: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setAPIData } = APIData.actions;
export default APIData.reducer;
