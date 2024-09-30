import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";

const Root = () => {
  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Nav />
      <Outlet />
    </div>
  );
};

export default Root;
