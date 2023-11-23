import ResultsList from "./ResultsList";
import classes from "./SearchResult.module.css";

const SearchResult = (props) => {
  return (
    <div className={classes.results}>
      <h2>Resultados</h2>
      <ResultsList />
    </div>
  );
};

export default SearchResult;
