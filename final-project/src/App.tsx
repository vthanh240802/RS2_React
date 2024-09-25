import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Root from "./pages/Root";
import ProductList from "./pages/ProductList";
import Categories from "./pages/Categories";
import Colors from "./pages/Colors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/colors",
    element: <Colors />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
