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

  return (
    <form>
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
      {(enteredCategoria == "Livros" || enteredCategoria == "") && (
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
          />
          <Input
            label="Autor"
            selector={false}
            newClasses={classes.radio}
            id="autor"
            type="radio"
            name="filtro_livro"
            value="Autor"
          />
          <Input
            label="Ambos"
            selector={false}
            newClasses={classes.radio}
            id="ambos"
            type="radio"
            name="filtro_livro"
            value="Ambos"
            checked
          />
        </div>
      )}
      <div className={classes.actions}>
        <Button type="button" className={classes.searchButton}>
          Pesquisar
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
