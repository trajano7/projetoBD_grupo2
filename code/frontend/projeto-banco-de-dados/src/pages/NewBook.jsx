import BookForm from "../components/BookForm";
import Page from "../components/UI/Page";

const NewBookPage = (props) => {
  return (
    <Page title="Cadastrar Livro">
      <BookForm />;
    </Page>
  );
};

export default NewBookPage;
