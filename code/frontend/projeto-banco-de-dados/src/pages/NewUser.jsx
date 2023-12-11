import Page from "../components/UI/Page";
import UserForm from "../components/UserForm";

const NewUserPage = (props) => {
  return (
    <Page title="Cadastra Usuário">
      <UserForm />;
    </Page>
  );
};

export default NewUserPage;
