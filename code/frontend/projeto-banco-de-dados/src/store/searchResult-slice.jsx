import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    resultsList: [],
    searchStatus: {
      status: 'initial',
      message: 'none'
    },
  },
  reducers: {
    setSearchStatus(state, action) {
      state.searchStatus = action.payload;
    },
    setResultsList(state, action) {
      state.searchStatus = { status: 'completed' };
      state.resultsList = action.payload;
    }
  },
});

export const searchResultActions = searchResultSlice.actions;
export default searchResultSlice.reducer;