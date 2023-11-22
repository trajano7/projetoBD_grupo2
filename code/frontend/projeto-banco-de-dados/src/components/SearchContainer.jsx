import classes from "./SearchContainer.module.css";
import SearchForm from "./SearchForm";

const SearchContainer = (props) => {
  const onSubmit = (data) => console.log(data);

  return (
    <div className={classes.searchContainer} >
      <h2>Bem vindo, Affonso</h2>
      <SearchForm />
    </div>
  );
};

export default SearchContainer;
