import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/UI/Button";
import Teste from "./components/Teste";

import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { action as searchAction } from "./components/SearchForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage />, action: searchAction }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
