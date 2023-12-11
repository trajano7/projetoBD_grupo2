import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "./searchResult-slice";
import loginReducer from "./login-slice";
import usersReducer from "./users-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    searchResult: searchResultReducer,
    login: loginReducer,
    users: usersReducer
  },
});

export default store;
