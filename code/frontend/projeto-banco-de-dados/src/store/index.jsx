import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "./searchResult-slice";
import loginReducer from "./login-slice";

const store = configureStore({
  reducer: {
    searchResult: searchResultReducer,
    login: loginReducer
  },
});

export default store;
