import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    resultsList: [],
    searchStatus: {
      status: "initial",
      message: "none",
    },
  },
  reducers: {
    setSearchStatus(state, action) {
      console.log("ola");
      state.searchStatus = action.payload;
    },
    setResultsList(state, action) {
      state.searchStatus = { status: "completed", message: "none" };
      state.resultsList = action.payload;
    },
    deleteItem(state, action) {
      state.searchStatus = { status: "completed", message: "none" };
      state.resultsList = state.resultsList.filter((item) => {
        const id = item.isbn ? item.isbn : item.ndeserie;
        console.log(id, action.payload);
        if (action.payload !== id) {
          return item;
        }
      });
    },
    reserveItem(state, action) {
      state.searchStatus = { status: "completed", message: "none" };
      state.resultsList = state.resultsList.map((item) => {
        const id = item.isbn ? item.isbn : item.ndeserie;
        if (id === action.payload) {
          return { ...item, status: "indisponivel" };
        }
        return item;
      });
    },
  },
});

export const searchResultActions = searchResultSlice.actions;
export default searchResultSlice.reducer;
