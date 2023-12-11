import { useDispatch, useSelector } from "react-redux";
import classes from "./UserCard.module.css";
import Button from "./UI/Button";
import { deleteUser } from "../store/users-actions";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.login);
  const dispatch = useDispatch();

  let isAdmin = false;
  if (loginInfo.isLoggedIn) {
    if (loginInfo.userInfo.cargo === "Admin") {
      isAdmin = true;
    }
  }

  const deleteUserHandler = () => {
    const proceed = window.confirm(
      `Você tem certeza que deseja deletar o usuário de ID ${props.id}`
    );

    if (proceed) {
      dispatch(deleteUser(props.id));
    }
  };

  const editUserHandler = () => {
    navigate(`/gerenciarUsuarios/${props.id}`)
  };

  const nomeCompleto = props.nome + " " + props.sobrenome;

  return (
    <div className={classes.user}>
      <div className={classes["user-info"]}>
        <img
          src={
            "https://i.pinimg.com/564x/23/e4/e7/23e4e7aa8e7a9e2dbc75fece9d77fc99.jpg"
          }
          alt={"cover"}
        />
        <div className={classes.info}>
          <h3>{nomeCompleto}</h3>
          <p className={classes.id}>{`ID: ${props.id}`}</p>
          <div className={classes.details}>
            <div>
              <div className={classes["details-title"]}>Username:</div>
              <div>{props.username}</div>
            </div>
            <div>
              <div className={classes["details-title"]}>Cargo:</div>
              <div>{props.cargo}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        {isAdmin && (
          <>
            <Button
              onClick={deleteUserHandler}
              className={classes["delete-button"]}
            >
              Deletar
            </Button>
            <Button onClick={editUserHandler}>Editar</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
