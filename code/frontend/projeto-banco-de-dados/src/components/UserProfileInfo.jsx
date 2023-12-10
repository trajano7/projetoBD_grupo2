import React from "react";
import classes from "./UserProfileInfo.module.css";

const UserProfileInfo = (props) => {
  return (
    <div className={classes.userProfileInfo}>
      <img
        className={classes.profilePhoto}
        src="https://i.pinimg.com/564x/23/e4/e7/23e4e7aa8e7a9e2dbc75fece9d77fc99.jpg"
        alt="Foto de Perfil"
      />
      <div className={classes.userInfo}>
        <h2>{props.nomeCompleto}</h2>
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
  );
};

export default UserProfileInfo;
