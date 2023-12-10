import { useSelector } from "react-redux";
import ResultsList from "./ResultsList";
import classes from "./SearchResult.module.css";

const SearchResult = (props) => {
  const resultsList = useSelector((state) => state.searchResult.resultsList);
  const searchStatus = useSelector((state) => state.searchResult.searchStatus);

  let results = null;
  if (searchStatus.status === "completed") {
    results = <ResultsList results={resultsList} />;
  }
  if (searchStatus.status === "loading") {
    results = (
      <>
        <div className={classes.loader}></div>
        <div className={classes["status_message"]}>Buscando resultados...</div>
      </>
    );
  } else if (searchStatus.status === "notFound") {
    results = <div className={classes["status_message"]}>Nenhum resultado encontrado.</div>;
  }

  return (
    <div className={classes.results}>
      {searchStatus.status !== "loading" && <h2>Resultados</h2>}
      {results !== null && results}
    </div>
  );
};

export default SearchResult;
