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
    const response = await fetch(
      `http://127.0.0.1:5000/usuarios/${searchInfo}`
    );

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      //throw { message: "Could not fetch events." };
      throw json(
        { message: "Could not fetch user." },
        {
          status: 500,
        }
      );

      // new Response(JSON.stringify({ message: "Could not fetch events." }), {
      //   status: 500,
      // });
    } else {
      const resData = await response.json();
      const data = [
        {
          cargo: resData.Funcao,
          id: resData.ID,
          username: resData.Login,
          nome: resData.Nome,
          sobrenome: resData.Sobrenome,
          uri: resData.URIFotoUsuario,
        },
      ];
      dispatch(usersActions.setUsersList(data));
    }

    // console.log(searchInfo);
    // console.log("despachando busca por usuarios");
    // dispatch(usersActions.setUsersList(DUMMY_USERS));
  };
};

let erro = false;

export const deleteUser = (userID) => {
  return async (dispatch) => {

    const response = await fetch(`http://127.0.0.1:5000/usuarios/${userID}`, {
      method: 'DELETE',
    });
  
    if (response.status === 400) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: "Could not delete user." }, { status: 500 });
    }

    dispatch(usersActions.deleteUser(userID));
  };
};
