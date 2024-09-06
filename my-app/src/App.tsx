import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ListsPosts from "./pages/ListPosts";
import PostDetail from "./pages/PostDetail";
import Root from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <ListsPosts />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  // return (
  //   <div className="App">
  //     {/* {posts.map((post) => (
  //       <Post title={post.title} body={post.body} />
  //     ))} */}
  //     {/* <ListsPosts /> */}
  //     <Login />
  //   </div>
  // );
  return <RouterProvider router={router} />;
}

export default App;
