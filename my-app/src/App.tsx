import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ListsPosts from "./pages/ListPosts";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      {/* {posts.map((post) => (
        <Post title={post.title} body={post.body} />
      ))} */}
      {/* <ListsPosts /> */}
      <Login />
    </div>
  );
}

export default App;
