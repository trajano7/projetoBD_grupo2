import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    invalidLogin: {
      invalidLoginFlag: false,
      message: "none",
    },
    userInfo: {
      id: "",
      nome: "",
      sobrenome: "",
      username: "",
      cargo: "Administrador",
      uri: "",
    },
  },
  reducers: {
    setInvalidLogin(state, action) {
      console.log('payload', action.payload)
      state.invalidLogin = action.payload;
    },
    login(state, action) {
      // atributir informacoes do usuario
      state.invalidLogin = {
        invalidLoginFlag: false,
        message: "none",
      };
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = {
        id: "",
        nome: "",
        sobrenome: "",
        username: "",
        cargo: "",
        uri: "",
      };
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
