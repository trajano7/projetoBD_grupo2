import { loginActions } from "./login-slice";
import { uiActions } from "./ui-slice";

const DUMMY_USER = {
  id: "1",
  nome: "João",
  sobrenome: "Silva",
  username: "joao.silva",
  cargo: "Chefe de Laboratório",
  uri: "https://exemplo.com/perfil1",
};

export const login = (loginInfo) => {
  return async (dispatch) => {
    console.log(loginInfo);
    dispatch(loginActions.login(DUMMY_USER));
    dispatch(uiActions.toggle());
  };
};
