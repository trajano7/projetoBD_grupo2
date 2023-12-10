import { Form, redirect, useFetcher } from "react-router-dom";
import useInput from "../hooks/use-input";
import Input from "./Input";
import classes from "./SearchForm.module.css";
import Button from "./UI/Button";
import { useDispatch } from "react-redux";
import { fetchSearchedData } from "../store/searchResult-actions";

const SearchForm = (props) => {
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
  } = useInput((value) => value.trim() !== "", "Livros");

  const {
    value: enteredFiltro,
    hasError: filtroInputHasError,
    isValid: filtroInputIsValid,
    valueChangeHandler: filtroChangedHandler,
    valueBlurHandler: filtroBlurHandler,
    resetInput: resetFiltroInput,
  } = useInput((value) => value.trim() !== "", "Ambos");

  const submitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInputHasError) {
      window.alert('Pesquisa inválida! O campo de pesquisa não pode estar vazio.')
      return;
    }

    let searchInfo = { categoria: enteredCategoria, name: enteredSearch };
    if (enteredCategoria === "Livros") {
      searchInfo = { ...searchInfo, filtro: enteredFiltro };
    }

    dispatch(fetchSearchedData(searchInfo));
  };

  return (
    <form className={classes.form} onSubmit={submitSearchHandler}>
      <h2>Pesquisar por Recursos</h2>
      <div className={classes["control-row"]}>
        <Input
          selector={true}
          selectorList={["Livros", "Recursos"]}
          newClasses={classes.select}
          id="categoria"
          name="categoria"
          value={enteredCategoria}
          onChange={categoriaChangedHandler}
          onBlur={categoriaBlurHandler}
        />
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
      </div>
      {enteredCategoria === "Livros" && (
        <div className={classes["radio-box"]}>
          <div>Pesquisar por: </div>
          <Input
            label="Título"
            selector={false}
            newClasses={classes.radio}
            id="título"
            type="radio"
            name="filtro_livro"
            value="Título"
            onChange={filtroChangedHandler}
            onBlur={filtroBlurHandler}
            checked={enteredFiltro === "Título"}
          />
          <Input
            label="Autor"
            selector={false}
            newClasses={classes.radio}
            id="autor"
            type="radio"
            name="filtro_livro"
            value="Autor"
            onChange={filtroChangedHandler}
            onBlur={filtroBlurHandler}
            checked={enteredFiltro === "Autor"}
          />
          <Input
            label="Ambos"
            selector={false}
            newClasses={classes.radio}
            id="ambos"
            type="radio"
            name="filtro_livro"
            value="Ambos"
            onChange={filtroChangedHandler}
            onBlur={filtroBlurHandler}
            checked={enteredFiltro === "" || enteredFiltro === "Ambos"}
          />
        </div>
      )}
      <div className={classes.actions}>
        <Button className={classes.searchButton}>Pesquisar</Button>
      </div>
    </form>
  );
};

export default SearchForm;

export async function action({ request, params }) {
  const data = await request.formData();
  // const searchData = {
  //   search: data.get("search"),
  //   categoria: data.get("categoria"),
  //   filtro: data.get("filtro_livro"),
  // };
  console.log(data.get("searchText"));

  console.log("teste");
  // console.log(searchData);

  // Fetch do eventData ...

  // return redirect('/');
}
