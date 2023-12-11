import { useFetcher, useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import Input from "./Input";
import classes from "./BookForm.module.css";
import Button from "./UI/Button";
import { useEffect } from "react";
import Page from "./UI/Page";

const BookForm = (props) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      resetTitle();
      resetAuthor();
      resetISBN();
      resetLocation();
      resetData();
      resetURI();
      resetEstado();
      resetDescription();
      window.alert(data.message);
    }
  }, [data, state]);

  const {
    value: enteredTitle,
    hasError: titleHasError,
    isValid: titleIsValid,
    valueChangeHandler: titleChangedHandler,
    valueBlurHandler: titleBlurHandler,
    resetInput: resetTitle,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAuthor,
    hasError: authorHasError,
    isValid: authorIsValid,
    valueChangeHandler: authorChangedHandler,
    valueBlurHandler: authorBlurHandler,
    resetInput: resetAuthor,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredISBN,
    hasError: isbnHasError,
    isValid: isbnIsValid,
    valueChangeHandler: isbnChangedHandler,
    valueBlurHandler: isbnBlurHandler,
    resetInput: resetISBN,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredData,
    hasError: dataHasError,
    isValid: dataIsValid,
    valueChangeHandler: dataChangedHandler,
    valueBlurHandler: dataBlurHandler,
    resetInput: resetData,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLocation,
    hasError: locationHasError,
    isValid: locationIsValid,
    valueChangeHandler: locationChangedHandler,
    valueBlurHandler: locationBlurHandler,
    resetInput: resetLocation,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredURI,
    hasError: URIHasError,
    isValid: URIIsValid,
    valueChangeHandler: URIChangedHandler,
    valueBlurHandler: URIBlurHandler,
    resetInput: resetURI,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEstado,
    hasError: estadoHasError,
    isValid: estadoIsValid,
    valueChangeHandler: estadoChangedHandler,
    valueBlurHandler: estadoBlurHandler,
    resetInput: resetEstado,
  } = useInput((value) => value.trim() !== "", "Regular");

  const {
    value: enteredDescription,
    hasError: descriptionHasError,
    isValid: descriptionIsValid,
    valueChangeHandler: descriptionChangedHandler,
    valueBlurHandler: descriptionBlurHandler,
    resetInput: resetDescription,
  } = useInput((value) => value.trim() !== "");

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!/^C\dP\d$/.test(enteredLocation.toUpperCase())) {
      window.alert(
        "A loacalização deve ter o seguinte formato: CXPY, sendo X e Y o número do corredor e número da prateleira, respectivamente."
      );
      return;
    }

    if (!valuesIsValid) {
      window.alert("Há um ou mais dados inválidos.");
      return;
    }

    const itemData = {
      title: enteredTitle.toLowerCase(),
      author: enteredAuthor.toLowerCase(),
      isbn: enteredISBN,
      date: enteredData,
      location: enteredLocation,
      URI: enteredURI,
      estado: enteredEstado,
      description: enteredDescription,
    };

    fetcher.submit(itemData, { method: "POST" });
  };

  const valuesIsValid =
    titleIsValid &&
    authorIsValid &&
    isbnIsValid &&
    dataIsValid &&
    locationIsValid &&
    URIIsValid &&
    estadoIsValid &&
    descriptionIsValid;

  const cancelRegistration = () => {
    navigate("/");
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="title"
            type="text"
            name="title"
            label="Título"
            value={enteredTitle}
            onChange={titleChangedHandler}
            onBlur={titleBlurHandler}
          />
          <div className={classes["control-error"]}>
            {titleHasError && <p>*Título obrigatório.</p>}
          </div>
        </div>
        <div className={classes["control"]}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="author"
            type="text"
            name="author"
            label="Autor"
            value={enteredAuthor}
            onChange={authorChangedHandler}
            onBlur={authorBlurHandler}
          />
          <div className={classes["control-error"]}>
            {authorHasError && <p>*Autor obrigatório.</p>}
          </div>
        </div>
      </div>
      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="isbn"
            type="text"
            name="isbn"
            label="ISBN"
            value={enteredISBN}
            onChange={isbnChangedHandler}
            onBlur={isbnBlurHandler}
          />
          <div className={classes["control-error"]}>
            {isbnHasError && <p>*ISBN obrigatório.</p>}
          </div>
        </div>
        <div className={classes["control"]}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="data"
            type="date"
            name="data"
            label="Data de Aquisição"
            value={enteredData}
            onChange={dataChangedHandler}
            onBlur={dataBlurHandler}
          />
          <div className={classes["control-error"]}>
            {dataHasError && <p>*Data de Aquisição obrigatório.</p>}
          </div>
        </div>
      </div>
      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="location"
            type="text"
            name="location"
            label="Localização do Material"
            value={enteredLocation}
            onChange={locationChangedHandler}
            onBlur={locationBlurHandler}
          />
          <div className={classes["control-error"]}>
            {locationHasError && <p>*Localizacao do Material obrigatório.</p>}
          </div>
        </div>
        <div className={classes.control}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="URI"
            type="url"
            name="URI"
            label="Foto de Perfíl (URI)"
            value={enteredURI}
            onChange={URIChangedHandler}
            onBlur={URIBlurHandler}
          />
          <div className={classes["control-error"]}>
            {URIHasError && <p>*URI da foto obrigatório.</p>}
          </div>
        </div>
      </div>
      <div className={classes["description"]}>
        <label htmlFor="description">Descrição do Material</label>
        <textarea
          rows="5"
          id="description"
          name="description"
          value={enteredDescription}
          onChange={descriptionChangedHandler}
          onBlur={descriptionBlurHandler}
        />
        <div className={classes["control-error"]}>
          {descriptionHasError && <p>*Descrição do Material obrigatório.</p>}
        </div>
      </div>
      <div className={`${classes["control-row"]} ${classes.estado}`}>
        <div className={classes["control"]}>
          <Input
            label="Mal Conservado"
            selector={false}
            newClasses={classes.radio}
            id="malconservado"
            type="radio"
            name="estado"
            value="Mal Conservado"
            onChange={estadoChangedHandler}
            onBlur={estadoBlurHandler}
          />
        </div>
        <div className={classes["control"]}>
          <Input
            label="Regular"
            selector={false}
            newClasses={classes.radio}
            id="regular"
            type="radio"
            name="estado"
            value="Regular"
            onChange={estadoChangedHandler}
            onBlur={estadoBlurHandler}
            checked={enteredEstado === "Regular"}
          />
        </div>
        <div className={classes["control"]}>
          <Input
            label="Administrador"
            selector={false}
            newClasses={classes.radio}
            id="bemconservado"
            type="radio"
            name="estado"
            value="Bem Conservado"
            onChange={estadoChangedHandler}
            onBlur={estadoBlurHandler}
          />
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          onClick={cancelRegistration}
          className={classes["delete-button"]}
        >
          Cancelar
        </Button>
        <Button disabled={!valuesIsValid}>Cadastrar</Button>
      </div>
    </form>
  );
};

export default BookForm;

export async function action({ request, params }) {
  const data = await request.formData();

  console.log(data.get("date"));
  console.log(data.get("title"));
  console.log(data.get("author"));
  console.log(data.get("isbn"));
  console.log(data.get("location"));
  console.log(data.get("URI"));
  console.log(data.get("estado"));
  console.log(data.get("description"));

  //   const info = {
  //     title: data.get("title"),
  //     author: data.get("author"),
  //     isbn: data.get("isbn"),
  //     data: data.get("data"),
  //     location: data.get("location"),
  //     URI: data.get("URI"),
  //     estado: data.get("estado"),
  //     description: data.get("description"),
  //   }

  //   consolo.log(info);

  return { message: "Cadastrado com sucesso!" };
}
