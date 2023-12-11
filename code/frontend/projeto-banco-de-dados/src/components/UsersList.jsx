import UserCard from "./UserCard";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <div className={classes.results}>
      <h3>Resultados:</h3>
      <ul>
        {props.results.map((result) => (
          <li key={result.id}>
            <UserCard {...result} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
