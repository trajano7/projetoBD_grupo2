import { searchResultActions } from "./searchResult-slice";

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
  },
  {
    ndeserie: 123456789,
    data_aquisicao: "2020-05-15",
    estado: "Regular",
    localizacao: "A3P5",
    status: "disponivel",
    uri: "https://exemplo.com/material2",
    descricao: "Um emocionante mistério a ser desvendado.",
  },
  {
    ndeserie: 987654321,
    data_aquisicao: "2019-07-22",
    estado: "Mal Conservado",
    localizacao: "B5P2",
    status: "indisponivel",
    uri: "https://exemplo.com/material3",
    descricao: "Uma história fascinante que irá mexer com suas emoções.",
  },

  // Adicione mais objetos conforme necessário
];

let x = 0;

export const fetchSearchedData = (searchInfo) => {
  return async (dispatch) => {
    //Faz o fetch do post, verifca erros, etc...
    //Try catch
    console.log(searchInfo);
    // if (x === 0) {
    //   dispatch(
    //     searchResultActions.setSearchStatus({
    //       status: 'loading',
    //     })
    //   );
    //   x = 1;
    //   return;
    // }
    dispatch(searchResultActions.setResultsList(DUMMY_RESULTS2));
  };
};
