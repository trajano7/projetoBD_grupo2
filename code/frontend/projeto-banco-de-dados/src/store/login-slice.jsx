import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: true,
    userInfo: { name: "Affonso", cargo: "Admin" },
  },
  reducers: {
    login(state, action) {
      // atributir informacoes do usuario
    },
    logout(state) {},
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
