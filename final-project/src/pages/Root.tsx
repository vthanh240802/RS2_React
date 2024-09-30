import React from "react";
import Header from "../components/layout/header";
import Nav from "../components/layout/nav";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Outlet />
    </div>
  );
};

export default Root;
