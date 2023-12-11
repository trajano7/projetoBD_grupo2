import BorrowedItem from "./BorrowedItem";
import classes from "./BorrowedItems.module.css";
import ResultsList from "./ResultsList";

const BorrowedItems = (props) => {
  const listIsEmpty = props.results.length === 0;

  return (
    <>
      {listIsEmpty && (
        <p style={{ textAlign: "center", color: "#34393c" }}>Nenhum resultado encontrado.</p>
      )}
      {!listIsEmpty && (
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
      )}
    </>
  );
};

export default BorrowedItems;
