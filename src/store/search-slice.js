import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: null,
  },
  reducers: {
    getSearchData(state, action) {
      state.query = action.payload.query;
      state.results = action.payload.results;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
