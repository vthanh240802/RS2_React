import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";

const Root = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />
      <div style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Nav />
        <div
          style={{
            flex: 1,
            display: "flex",
            padding: "20px",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
