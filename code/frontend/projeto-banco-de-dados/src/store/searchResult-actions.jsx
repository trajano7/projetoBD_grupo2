import { searchResultActions } from "./searchResult-slice";
import { uiActions } from "./ui-slice";

const DUMMY_RESULTS = [
  {
    titulo: "O Guia do Mochileiro das Galáxias",
    autor: "Douglas Adams",
    isbn: 8580415543,
    data_aquisicao: "2018-10-02",
    estado: "Bem Conservado",
    localizacao: "C7P8",
    status: "disponivel",
    uri: "https://exemplo.com/livro1",
    descricao: "Uma incrível aventura pelo espaço sideral.",
    categora: "Livro",
  },
  {
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling",
    isbn: 9788532530271,
    data_aquisicao: "2020-05-15",
    estado: "Ótimo Estado",
    localizacao: "C3P5",
    status: "emprestado",
    uri: "https://exemplo.com/livro2",
    descricao: "O primeiro livro da famosa série de Harry Potter.",
    categora: "Livro",
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    isbn: 9788532530272,
    data_aquisicao: "2019-02-05",
    estado: "Desgastado",
    localizacao: "C4P2",
    status: "disponivel",
    uri: "https://exemplo.com/livro3",
    descricao: "Um clássico distópico que faz refletir sobre a sociedade.",
    categora: "Livro",
  },
  {
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    isbn: 9788578270308,
    data_aquisicao: "2020-07-15",
    estado: "Ótimo Estado",
    localizacao: "C3P5",
    status: "disponivel",
    uri: "https://exemplo.com/livro4",
    descricao: "Uma épica jornada pela Terra Média.",
    categora: "Livro",
  },
  // Adicione mais objetos conforme necessário
];

const DUMMY_RESULTS2 = [
  {
    ndeserie: 8580415543,
    data_aquisicao: "2018-10-02",
    estado: "Bem Conservado",
    localizacao: "C7P8",
    status: "disponivel",
    uri: "https://exemplo.com/material1",
    descricao: "Uma incrível aventura pelo espaço sideral.",
    categoria: "Material",
  },
  {
    ndeserie: 123456789,
    data_aquisicao: "2020-05-15",
    estado: "Regular",
    localizacao: "A3P5",
    status: "disponivel",
    uri: "https://exemplo.com/material2",
    descricao: "Um emocionante mistério a ser desvendado.",
    categoria: "Material",
  },
  {
    ndeserie: 987654321,
    data_aquisicao: "2019-07-22",
    estado: "Mal Conservado",
    localizacao: "B5P2",
    status: "indisponivel",
    uri: "https://exemplo.com/material3",
    descricao: "Uma história fascinante que irá mexer com suas emoções.",
    categoria: "Material",
  },

  // Adicione mais objetos conforme necessário
];

let x = 0;

export const fetchSearchedData = (searchInfo) => {
  return async (dispatch) => {
    dispatch(
      searchResultActions.setSearchStatus({
        status: "loading",
      })
    );

    console.log(searchInfo);

    const fetchData = async () => {
      let categoria = "/livros/busca";
      let search = {
        name: searchInfo.name,
        filtro: searchInfo.filtro,
      };
      if (searchInfo.categoria === "Recursos") {
        categoria = "/materiais/busca";
        search = { name: searchInfo.name };
      }
      const response = await fetch(`http://127.0.0.1:5000/${categoria}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Defina o tipo de mídia como JSON ou conforme necessário
        },
        body: JSON.stringify(search),
      });
      if (!response.ok) {
        throw new Error("Could not fetch materials");
      }

      const data = await response.json();

      return data;
    };

    try {
      const searchResponseData = await fetchData();
      console.log("Teste: ", searchResponseData);
      if (searchInfo.categoria === "Livros") {
        dispatch(
          searchResultActions.setResultsList(
            searchResponseData.map((result) => ({
              ID: result.ID,
              titulo: result.Titulo,
              autor: result.Autor,
              isbn: result.ISBN,
              data_aquisicao: result.DataAquisicao,
              estado: result.EstadoConservacao,
              localizacao: result.LocalizacaoFisica,
              uri: result.URICapaLivro,
              descricao: result.Descricao,
              categoria: result.Categoria,
            }))
          )
        );
      } else {
        dispatch(
          searchResultActions.setResultsList(
            searchResponseData.map((result) => ({
              ID: result.ID,
              ndeserie: result.NumeroSerie,
              data_aquisicao: result.DataAquisicao,
              estado: result.EstadoConservacao,
              localizacao: result.LocalizacaoFisica,
              uri: result.URIFotoMaterial,
              descricao: result.Descricao,
              categoria: result.Categoria,
            }))
          )
        );
      }
    } catch (error) {
      console.log("error", error);
      dispatch(
        searchResultActions.setSearchStatus({
          status: "error",
          message: "could not fetch materials",
        })
      );
    }
  };
};

let erro = false;

export const deleteItem = (itemID) => {
  return async (dispatch) => {
    console.log(itemID);
    console.log("despachando delete");
    if (erro) {
      console.log("erro");
      dispatch(
        searchResultActions.setSearchStatus({
          status: "error",
          message:
            "Não foi possível deletar o item. Ele está emprestado no momento.",
        })
      );
      return;
    }
    dispatch(searchResultActions.deleteItem(itemID));
  };
};

export const reserveItem = (itemInfo) => {
  return async (dispatch) => {
    console.log(itemInfo)
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/emprestimos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Defina o tipo de mídia como JSON ou conforme necessário
        },
        body: JSON.stringify({
          itemInfo
        }),
      });
      if (!response.ok) {
        throw new Error("Could not reserve");
      }

      const data = await response.json();

      return data;
    };

    try {
      const searchResponseData = await fetchData();
      // dispatch(searchResultActions.reserveItem(itemInfo.ID));
    } catch (error) {
      console.log("error", error);
      dispatch(
        searchResultActions.setSearchStatus({
          status: "error",
          message: "could not reserve material",
        })
      );
    }
  };
};
