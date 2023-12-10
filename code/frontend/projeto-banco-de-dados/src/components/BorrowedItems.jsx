import BorrowedItem from "./BorrowedItem";
import classes from "./BorrowedItems.module.css";
import ResultsList from "./ResultsList";

const BorrowedItems = (props) => {
  return (
    <>
      <h3 className={classes.title}>Meus Emprestimos:</h3>;
      <ul>
        {props.results.map((result) => {
          let itemKey = "";
          let isBookResult = false;
          if (result.hasOwnProperty("isbn")) {
            itemKey = result.isbn;
            isBookResult = true;
          } else {
            itemKey = result.ndeserie;
          }
          return (
            <li key={itemKey}>
              <BorrowedItem {...result} isBookResult={isBookResult} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BorrowedItems;
