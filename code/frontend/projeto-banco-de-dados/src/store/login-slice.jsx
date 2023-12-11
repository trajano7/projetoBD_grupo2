import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    // userInfo: { name: "Affonso", cargo: "Administrador" },
    // userInfo: { name: "Affonso", cargo: "Chefe de Laboratório" },
    userInfo: {
      id: "",
      nome: "",
      sobrenome: "",
      username: "",
      cargo: "",
      uri: "",
    },
  },
  reducers: {
    login(state, action) {
      // atributir informacoes do usuario
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
