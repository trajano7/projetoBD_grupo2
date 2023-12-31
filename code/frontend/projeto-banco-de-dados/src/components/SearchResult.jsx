import { useSelector } from "react-redux";
import ResultsList from "./ResultsList";
import classes from "./SearchResult.module.css";
import { useEffect } from "react";

const SearchResult = (props) => {
  const resultsList = useSelector((state) => state.searchResult.resultsList);
  const searchStatus = useSelector((state) => state.searchResult.searchStatus);

  console.log('Rapadura')

  let results = <ResultsList results={resultsList} />;
  console.log(resultsList)
  useEffect(() => {
    if (searchStatus.status === "loading") {
      results = (
        <>
          <div className={classes.loader}></div>
          <div className={classes["status_message"]}>
            Buscando resultados...
          </div>
        </>
      );
    } else if (searchStatus.status === "notFound") {
      results = (
        <div className={classes["status_message"]}>
          Nenhum resultado encontrado.
        </div>
      );
    }

    if (searchStatus.status === "error") {
      window.alert(searchStatus.message);
    }
  }, [resultsList, searchStatus]);

  return (
    <div className={classes.results}>
      {searchStatus.status !== "loading" && <h2>Resultados</h2>}
      {results}
    </div>
  );
};

export default SearchResult;
