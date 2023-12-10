import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootPage = (props) => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootPage;