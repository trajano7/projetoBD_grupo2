import ResultCard from "./ResultCard";
import classes from "./ResultsList.module.css";

const ResultsList = (props) => {
  return (
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
            <ResultCard {...result} isBookResult={isBookResult} />
          </li>
        );
      })}
    </ul>
  );
};

export default ResultsList;
