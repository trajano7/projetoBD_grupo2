import classes from "./UserCard.module.css";

const UserCard = (props) => {
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
          <h3>{props.nomeCompleto}</h3>
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
    </div>
  );
};

export default UserCard;
