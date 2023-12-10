import { useSelector } from "react-redux";
import SearchContainer from "../components/SearchContainer";
import SearchResult from "../components/SearchResult";

const HomePage = (props) => {
  const searchStatus = useSelector((state) => state.searchResult.searchStatus);
  const showResults = searchStatus.status !== 'initial' && searchStatus.status !== 'error';

  return (
    <main>
      <SearchContainer />
      {showResults && <SearchResult />}
    </main>
  );
};

export default HomePage;
