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
    element: <Root />,
    children: [
      {
        path: "/product-list",
        element: <ProductList />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/colors",
        element: <Colors />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
