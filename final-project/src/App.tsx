import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./store/reducers/authReducer";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Root from "./pages/Root";
import ProductList from "./pages/Products";
import Categories from "./pages/Categories";
import Colors from "./pages/Color";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
