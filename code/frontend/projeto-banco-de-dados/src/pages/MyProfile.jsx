import { Suspense } from "react";
import BorrowedItems from "../components/BorrowedItems";
import Page from "../components/UI/Page";
import UserProfileInfo from "../components/UserProfileInfo";

import classes from "./MyProfile.module.css";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const userloggedInfo = useSelector((state) => state.login.userInfo);
  const { borrowedItems } = useLoaderData();
  console.log(userloggedInfo)

  const nomeCompleto = userloggedInfo.nome + " " + userloggedInfo.sobrenome;

  return (
    <Page title="Meu Perfil">
      <UserProfileInfo
        nomeCompleto={nomeCompleto}
        username={userloggedInfo.username}
        cargo={userloggedInfo.cargo}
      />
      <h3 className={classes["borrowed-title"]}>Meus Emprestimos:</h3>;
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={borrowedItems}>
          {(loadedItems) => <BorrowedItems results={loadedItems} />}
        </Await>
      </Suspense>
      {/* <BorrowedItems results={DUMMY_RESULTS} /> */}
    </Page>
  );
};

export default MyProfilePage;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function loadBorrowedItems() {
  // const response = await fetch("http://localhost:8080/events");

  // if (!response.ok) {
  //   //throw { message: "Could not fetch events." };
  //   throw json(
  //     { message: "Could not fetch events." },
  //     {
  //       status: 500,
  //     }
  //   );

  //   // new Response(JSON.stringify({ message: "Could not fetch events." }), {
  //   //   status: 500,
  //   // });
  // } else {
  //   // return response;
  //   const resData = await response.json();
  //   return resData.events;
  // }
  console.log('Iniciando busca')
  new Promise((resolve) => setTimeout(resolve, 10000))
  console.log('Encontrados')
  return DUMMY_RESULTS;
}

export function loader() {
  return defer({
    borrowedItems: loadBorrowedItems(),
  });
}
