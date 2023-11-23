import { Form, redirect } from "react-router-dom";
import useInput from "../hooks/use-input";
import Input from "./Input";
import classes from "./SearchForm.module.css";
import Button from "./UI/Button";

const SearchForm = (props) => {
  const {
    value: enteredSearch,
    hasError: searchInputHasError,
    isValid: searchInputIsValid,
    valueChangeHandler: searchChangedHandler,
    valueBlurHandler: searchBlurHandler,
    resetInput: resetsearchInput,
  } = useInput((value) => value.trim() !== "", "Procure por um recurso...");

  const {
    value: enteredCategoria,
    hasError: categoriaInputHasError,
    isValid: categoriaInputIsValid,
    valueChangeHandler: categoriaChangedHandler,
    valueBlurHandler: categoriaBlurHandler,
    resetInput: resetCategoriaInput,
  } = useInput((value) => value.trim() !== "", "Procure por um recurso...");

  const {
    value: enteredFiltro,
    hasError: filtroInputHasError,
    isValid: filtroInputIsValid,
    valueChangeHandler: filtroChangedHandler,
    valueBlurHandler: filtroBlurHandler,
    resetInput: resetFiltroInput,
  } = useInput((value) => value.trim() !== "");

  const submitSearchHandler = (event) => {
    event.preventDefault()
  }

  return (
    <Form method="post" >
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
          type="text"
          name="search"
          value={enteredSearch}
          onChange={searchChangedHandler}
          onBlur={searchBlurHandler}
        />
      </div>
      {(enteredCategoria === "Livros" || enteredCategoria === "") && (
        <div className={classes['radio-box']}>
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
        <Button className={classes.searchButton}>
          Pesquisar
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;

export async function action({request, params}) {
  const data = await request.formData() 
  const searchData = {
    search: data.get('search'),
    categoria: data.get('categoria'),
    filtro: data.get('filtro_livro')
  }

  console.log("teste")
  console.log(searchData);

  // Fetch do eventData ...

  return redirect('/');
}