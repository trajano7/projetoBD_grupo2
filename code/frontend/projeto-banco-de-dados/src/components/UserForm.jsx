import { Form, useFetcher, useNavigate } from "react-router-dom";
import classes from "./UserForm.module.css";
import Input from "./Input";
import Button from "./UI/Button";
import useInput from "../hooks/use-input";
import { useEffect } from "react";
import Page from "./UI/Page";

const UserForm = (props) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (data && data.message) {
      resetName();
      resetSurname();
      resetUsername();
      resetPassword();
      resetURI();
      resetRole();
      window.alert(data.message);
    }
  }, [data, state]);

  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangedHandler,
    valueBlurHandler: nameBlurHandler,
    resetInput: resetName,
  } = useInput(
    (value) => value.trim() !== "",
    props.user ? props.user.nome : ""
  );

  const {
    value: enteredSurname,
    hasError: surnameHasError,
    isValid: surnameIsValid,
    valueChangeHandler: surnameChangedHandler,
    valueBlurHandler: surnameBlurHandler,
    resetInput: resetSurname,
  } = useInput(
    (value) => value.trim() !== "",
    props.user ? props.user.sobrenome : ""
  );

  const {
    value: enteredUsername,
    hasError: usernameHasError,
    isValid: usernameIsValid,
    valueChangeHandler: usernameChangedHandler,
    valueBlurHandler: usernameBlurHandler,
    resetInput: resetUsername,
  } = useInput(
    (value) => value.trim() !== "",
    props.user ? props.user.username : ""
  );

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangedHandler,
    valueBlurHandler: passwordBlurHandler,
    resetInput: resetPassword,
  } = useInput((value) => value.trim().length >= 5);

  const {
    value: enteredURI,
    hasError: URIHasError,
    isValid: URIIsValid,
    valueChangeHandler: URIChangedHandler,
    valueBlurHandler: URIBlurHandler,
    resetInput: resetURI,
  } = useInput(
    (value) => value.trim() !== "",
    props.user ? props.user.uri : ""
  );

  const {
    value: enteredRole,
    hasError: roleHasError,
    isValid: roleIsValid,
    valueChangeHandler: roleChangedHandler,
    valueBlurHandler: roleBlurHandler,
    resetInput: resetRole,
  } = useInput(
    (value) => value.trim() !== "",
    props.user ? props.user.cargo : "Membro do Laboratório"
  );

  const cancelRegistration = () => {
    if (!props.user) {
      navigate("/");
    }
    navigate("/gerenciarUsuarios");
  };

  const valuesIsValid =
    nameIsValid &&
    surnameIsValid &&
    usernameIsValid &&
    passwordIsValid &&
    URIIsValid &&
    roleIsValid;

  const submitFormHandler = (event) => {
    event.preventDefault();

    const userData = {
      name: enteredName.toLowerCase(),
      surname: enteredSurname.toLowerCase(),
      username: enteredUsername,
      password: enteredPassword,
      URI: enteredURI,
      role: enteredRole,
    };

    if (!valuesIsValid) {
      window.alert("Há um ou mais dados inválidos.");
      return;
    }

    fetcher.submit(userData, { method: "POST" });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="nome"
            type="text"
            name="nome"
            label="Nome"
            value={enteredName}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
          />
          <div className={classes["control-error"]}>
            {nameHasError && <p>*Nome obrigatório.</p>}
          </div>
        </div>
        <div className={classes["control"]}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="sobrenome"
            type="text"
            name="sobrenome"
            label="Sobrenome"
            value={enteredSurname}
            onChange={surnameChangedHandler}
            onBlur={surnameBlurHandler}
          />
          <div className={classes["control-error"]}>
            {surnameHasError && <p>*Sobrenome obrigatório.</p>}
          </div>
        </div>
      </div>
      <div className={classes["control-row"]}>
        <div className={classes["control"]}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="Username"
            type="text"
            name="Username"
            label="Username"
            value={enteredUsername}
            onChange={usernameChangedHandler}
            onBlur={usernameBlurHandler}
          />
          <div className={classes["control-error"]}>
            {usernameHasError && <p>*Nome de usuário obrigatório.</p>}
          </div>
        </div>
        <div className={classes["control"]}>
          <Input
            selector={false}
            newClasses={classes.input}
            id="senha"
            type="password"
            name="senha"
            label="Senha"
            value={enteredPassword}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
          <div className={classes["control-error"]}>
            {passwordHasError && <p>*A senha conter mais de 5 chars.</p>}
          </div>
        </div>
      </div>
      <div className={classes["control"]}>
        <Input
          selector={false}
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
      <div className={classes["control-row"]}>
        <div className={classes["control"]}>
          <Input
            label="Membro do Laboratório"
            selector={false}
            newClasses={classes.radio}
            id="membro"
            type="radio"
            name="cargo"
            value="Membro do Laboratório"
            onChange={roleChangedHandler}
            onBlur={roleBlurHandler}
            checked={enteredRole === "Membro do Laboratório"}
          />
        </div>
        <div className={classes["control"]}>
          <Input
            label="Chefe de Laboratório"
            selector={false}
            newClasses={classes.radio}
            id="chefe"
            type="radio"
            name="cargo"
            value="Chefe de Laboratório"
            onChange={roleChangedHandler}
            onBlur={roleBlurHandler}
            checked={enteredRole === "Chefe de Laboratório"}
          />
        </div>
        <div className={classes["control"]}>
          <Input
            label="Administrador"
            selector={false}
            newClasses={classes.radio}
            id="admin"
            type="radio"
            name="cargo"
            value="Administrador"
            onChange={roleChangedHandler}
            onBlur={roleBlurHandler}
            checked={enteredRole === "Administrador"}
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

export default UserForm;

export async function action({ request, params }) {
  const data = await request.formData();

  console.log("teste");
  console.log(data.get("name"));

  return { message: "Cadastrado com sucesso!" };
}
