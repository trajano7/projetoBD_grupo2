import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootPage = (props) => {
  return (
    <>
      <MainNavigation />
      <div className="style-box" />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootPage;