import React from "react";
import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Link to="/">List post</Link>
      <Outlet />
    </div>
  );
};

export default Root;
