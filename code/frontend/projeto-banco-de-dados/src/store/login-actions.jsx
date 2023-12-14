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
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Defina o tipo de mídia como JSON ou conforme necessário
        },
        body: JSON.stringify(loginInfo),
      });
      console.log("STATUS:", response.status);

      if (!response.ok && response.status !== 401) {
        throw new Error("Could not login!");
      }

      const data = await response.json();

      console.log(data);

      return data;
    };

    const loginResponse = await fetchData();
    if (
      loginResponse.message === "Usuário não encontrado" ||
      loginResponse.message === "Credenciais inválidas"
    ) {
      dispatch(
        loginActions.setInvalidLogin({
          invalidLoginFlag: true,
          message: "Login ou Senha inválidos!",
        })
      );
      return;
    }
    dispatch(
      loginActions.login({
        id: loginResponse.user.ID,
        nome: loginResponse.user.Nome,
        sobrenome: loginResponse.user.Sobrenome,
        username: loginResponse.user.Login,
        cargo: loginResponse.user.Funcao,
        uri: loginResponse.user.URIFotoUsuario,
      })
    );
  };
};
