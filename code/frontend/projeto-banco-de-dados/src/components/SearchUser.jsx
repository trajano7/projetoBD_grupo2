import { useFetcher } from "react-router-dom";
import useInput from "../hooks/use-input";
import Input from "./Input";
import classes from "./SearchUser.module.css";
import Button from "./UI/Button";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store/users-actions";

const SearchUser = (props) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();

  const {
    value: enteredSearch,
    hasError: searchInputHasError,
    isValid: searchInputIsValid,
    valueChangeHandler: searchChangedHandler,
    valueBlurHandler: searchBlurHandler,
    resetInput: resetsearchInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCategoria,
    hasError: categoriaInputHasError,
    isValid: categoriaInputIsValid,
    valueChangeHandler: categoriaChangedHandler,
    valueBlurHandler: categoriaBlurHandler,
    resetInput: resetCategoriaInput,
  } = useInput((value) => value.trim() !== "", "Nome");

  const submitSearchHandler = (event) => {
    event.preventDefault();
  
    if (searchInputHasError) {
      window.alert('Pesquisa inválida! O campo de pesquisa não pode estar vazio.')
      return;
    }

    const searchInfo = enteredSearch;
    dispatch(fetchUsers(searchInfo));
  };

  return (
    <form className={classes.form} onSubmit={submitSearchHandler}>
      <h3>Buscar Usuários por ID</h3>
      <div className={classes['control-row']}>
        {/* <Input
            selector={true}
            selectorList={["Nome", "ID"]}
            newClasses={classes.select}
            id="categoria"
            name="categoria"
            value={enteredCategoria}
            onChange={categoriaChangedHandler}
            onBlur={categoriaBlurHandler}
        /> */}
        <Input
            selector={false}
            newClasses={classes.input}
            id="search"
            type="search"
            name="search"
            value={enteredSearch}
            onChange={searchChangedHandler}
            onBlur={searchBlurHandler}
        />
        <div className={classes.actions}>
            <Button className={classes.searchButton}>Buscar</Button>
        </div>
      </div>
    </form>
  );
};

export default SearchUser;

