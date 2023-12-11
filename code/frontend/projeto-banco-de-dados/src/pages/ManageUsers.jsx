import { useSelector } from "react-redux";
import SearchUser from "../components/SearchUser";
import Page from "../components/UI/Page";
import UsersList from "../components/UsersList";
import { useEffect } from "react";

const ManageUsersPage = (props) => {
  const resultsList = useSelector((state) => state.users.usersList);
  const searchStatus = useSelector((state) => state.users.searchUsersStatus);

  console.log("Aqui: ", resultsList);

  let results = <UsersList results={resultsList} />;
  useEffect(() => {
    if (searchStatus.status === "loading") {
      results = (
        <>
          <div className={classes.loader}></div>
          <div className={classes["status_message"]}>
            Buscando resultados...
          </div>
        </>
      );
    } else if (searchStatus.status === "notFound") {
      results = (
        <div className={classes["status_message"]}>
          Nenhum resultado encontrado.
        </div>
      );
    }

    if (searchStatus.status === "error") {
      window.alert(searchStatus.message);
    }
  }, [resultsList, searchStatus]);

  return (
    <Page title="Gerenciar Usuários">
      <SearchUser />
      {results}
    </Page>
  );
};

export default ManageUsersPage;
