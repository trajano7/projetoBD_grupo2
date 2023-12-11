import { usersActions } from "./users-slice";

const DUMMY_USERS = [
  {
    id: "1",
    nome: "João",
    sobrenome: "Silva",
    username: "joao.silva",
    cargo: "Membro do Laboratório",
    uri: "https://exemplo.com/perfil1",
  },
  {
    id: "2",
    nome: "Maria",
    sobrenome: "Souza",
    username: "maria.souza",
    cargo: "Chefe de Laboratório",
    uri: "https://exemplo.com/perfil2",
  },
  {
    id: "3",
    nome: "Carlos",
    sobrenome: "Fernandes",
    username: "carlos.fernandes",
    cargo: "Administrador",
    uri: "https://exemplo.com/perfil3",
  },
  // Adicione mais usuários conforme necessário
];

export const fetchUsers = (searchInfo) => {
  return async (dispatch) => {
    console.log(searchInfo);
    console.log("despachando busca por usuarios");
    dispatch(usersActions.setUsersList(DUMMY_USERS));
  };
};

let erro = false

export const deleteUser = (userID) => {
  return async (dispatch) => {
    console.log(userID);
    console.log("despachando delete");
    if (erro) {
        dispatch(usersActions.setUsersStatus({ status: 'error', message: 'Não foi possível deletar. O usuário possui emprestimos em aberto.' }))
        return;
    }
    dispatch(usersActions.deleteUser(userID));
  };
};
