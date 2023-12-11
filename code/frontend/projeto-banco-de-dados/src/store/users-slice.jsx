import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    searchUsersStatus: {
      status: "initial",
      message: "none",
    },
  },
  reducers: {
    setUsersStatus(state, action) {
      state.searchUsersStatus = action.payload;
    },
    setUsersList(state, action) {
      state.searchUsersStatus = { status: "completed", message: "none" };
      state.usersList = action.payload;
    },
    deleteUser(state, action) {
      state.searchUsersStatus = { status: "completed", message: "none" };
      state.usersList = state.usersList.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
