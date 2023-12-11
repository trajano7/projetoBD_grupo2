import { useSelector } from "react-redux";
import classes from "./SearchContainer.module.css";
import SearchForm from "./SearchForm";

const SearchContainer = (props) => {
  const loginInfo = useSelector((state) => state.login);
  let welcome = 'Bem vindo!';
  if (loginInfo.isLoggedIn) {
    welcome = `Bem vindo, ${loginInfo.userInfo.nome}!`;
  }

  return (
    <>
      <div className={classes["style-box"]}/>
      <div className={classes.searchContainer}>
        <h2>{welcome}</h2>
        <SearchForm />
      </div>
    </>
  );
};

export default SearchContainer;
