import { useDispatch, useSelector } from "react-redux";
import SearchContainer from "../components/SearchContainer";
import SearchResult from "../components/SearchResult";
import Modal from "../components/UI/Modal";
import LoginForm from "../components/LoginForm";
import { uiActions } from "../store/ui-slice";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const searchStatus = useSelector((state) => state.searchResult.searchStatus);
  const loginIsVisible = useSelector((state) => state.ui.loginIsVisible);
  const showResults = searchStatus.status !== "initial";

  const closeModalHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <main>
      {loginIsVisible && (
        <Modal onClose={closeModalHandler}>
          <LoginForm />
        </Modal>
      )}
      <SearchContainer />
      {showResults && <SearchResult />}
    </main>
  );
};

export default HomePage;
