import ResultCard from "./ResultCard";
import classes from "./ResultsList.module.css";

const DUMMY_RESULTS = [
  {
    titulo: "O Guia do Mochileiro das Galáxias",
    autor: "Douglas Adams",
    isbn: 8580415543,
    data_aquisicao: new Date(2018, 10, 2),
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
    data_aquisicao: new Date(2020, 5, 15),
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
    data_aquisicao: new Date(2019, 2, 5),
    estado: "Desgastado",
    localizacao: "C4P2",
    status: "disponivel",
    uri: "https://exemplo.com/livro3",
    descricao: "Um clássico distópico que faz refletir sobre a sociedade.",
  },
  // Adicione mais objetos conforme necessário
];

const ResultsList = (props) => {
  return (
    <ul>
      {DUMMY_RESULTS.map((result) => (
        <li key={result.isbn}>
            <ResultCard {...result} />
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
