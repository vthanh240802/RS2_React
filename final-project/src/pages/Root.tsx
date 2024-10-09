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
        minHeight: "100vh",
      }}
    >
      <Header />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Nav />
        <div
          style={{
            flex: 1,
            display: "flex",
            // justifyContent: "center",
            padding: "20px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
