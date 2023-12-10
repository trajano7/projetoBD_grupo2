import BorrowedItems from "../components/BorrowedItems";
import Page from "../components/UI/Page";
import UserCard from "../components/UserCard";
import UserProfileInfo from "../components/UserProfileInfo";

import classes from "./MyProfile.module.css";

const DUMMY_RESULTS = [
  {
    titulo: "O Guia do Mochileiro das Galáxias",
    autor: "Douglas Adams",
    isbn: 8580415543,
    data_emprestimo: "2023-10-02",
    data_devolucao: "2023-10-10",
    status: "Em Andamento",
    uri: "https://exemplo.com/livro1",
  },
  {
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling",
    isbn: 9788532530271,
    data_emprestimo: "2023-09-20",
    data_devolucao: "2023-09-28",
    status: "Finalizado",
    uri: "https://exemplo.com/livro2",
  },
  {
    ndeserie: 8580415546,
    data_emprestimo: "2023-10-01",
    data_devolucao: "2023-10-05",
    status: "Atrasado",
    uri: "https://exemplo.com/material1",
  },
];

const MyProfilePage = (props) => {
  return (
    <Page>
      <h2 className={classes["page-header"]}>Meu Perfil</h2>
      <UserProfileInfo nomeCompleto="Affonso Faca" username="affonso" cargo="Chefe de Laboratório"/>
      <BorrowedItems results={DUMMY_RESULTS}/>
    </Page>
  );
};

export default MyProfilePage;
