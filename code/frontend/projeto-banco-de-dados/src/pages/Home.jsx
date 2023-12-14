import { useDispatch, useSelector } from "react-redux";
import SearchContainer from "../components/SearchContainer";
import SearchResult from "../components/SearchResult";
import Modal from "../components/UI/Modal";
import LoginForm from "../components/LoginForm";
import { uiActions } from "../store/ui-slice";
import { useEffect } from "react";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const searchStatus = useSelector((state) => state.searchResult.searchStatus);
  const loginIsVisible = useSelector((state) => state.ui.loginIsVisible);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
  const showResults = searchStatus.status !== "initial";

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(uiActions.toggle());
    }
  }, [isLoggedIn])

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
