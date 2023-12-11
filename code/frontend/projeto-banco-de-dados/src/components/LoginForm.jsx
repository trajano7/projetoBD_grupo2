import { useDispatch } from "react-redux";
import useInput from "../hooks/use-input";
import Input from "./Input";
import classes from "./LoginForm.module.css";
import Button from "./UI/Button";
import { uiActions } from "../store/ui-slice";
import { loginActions } from "../store/login-slice";
import { login } from "../store/login-actions";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const {
    value: enteredUsername,
    hasError: usernameHasError,
    isValid: usernameIsValid,
    valueChangeHandler: usernameChangedHandler,
    valueBlurHandler: usernameBlurHandler,
    resetInput: resetUsername,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangedHandler,
    valueBlurHandler: passwordBlurHandler,
    resetInput: resetPassword,
  } = useInput((value) => value.trim() !== "");

  const closeModalHandler = () => {
    dispatch(uiActions.toggle());
  };

  const submitLoginHandler = (event) => {
    event.preventDefault();

    if (!usernameIsValid || !passwordIsValid) {
      window.alert("*Usuário e senha são campos obrigatórios.");
      return;
    }

    dispatch(login({ username: enteredUsername, password: enteredPassword }));
  };

  return (
    <form className={classes.form} onSubmit={submitLoginHandler}>
      <h3>Fazer Login</h3>
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
          {usernameHasError && <p>*Username obrigatório.</p>}
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
          {passwordHasError && <p>*Senha obrigatória.</p>}
        </div>
      </div>
      <Button className={classes.button}>Entrar</Button>
      <Button
        onClick={closeModalHandler}
        className={`${classes.button} ${classes["cancel-button"]}`}
      >
        Cancelar
      </Button>
    </form>
  );
};

export default LoginForm;
