import "./App.css";

import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { action as searchAction } from "./components/ResultCard";
import NewUserPage from "./pages/NewUser";
import { action as newUserAction } from "./components/UserForm";
import NewBookPage from "./pages/NewBook";
import { action as newBookAction } from "./components/BookForm";
import NewMaterialPage from "./pages/NewMaterial";
import { action as newMaterialAction } from "./components/MaterialForm";
import MyProfilePage, {
  loader as borrowedItemsLoader,
} from "./pages/MyProfile";
import ManageUsersPage from "./pages/ManageUsers";
import EditUserPage from "./pages/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, action: searchAction },
      { path: "/novoUsuario", element: <NewUserPage />, action: newUserAction },
      { path: "/novoLivro", element: <NewBookPage />, action: newBookAction },
      {
        path: "/novoMaterial",
        element: <NewMaterialPage />,
        action: newMaterialAction,
      },
      {
        path: "/meuPerfil/:userID",
        element: <MyProfilePage />,
        loader: borrowedItemsLoader,
      },
      { path: "/gerenciarUsuarios", element: <ManageUsersPage /> },
      { path: "/gerenciarUsuarios/:userID", element: <EditUserPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
