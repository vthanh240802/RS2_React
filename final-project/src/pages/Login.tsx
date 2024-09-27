import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Login = () => {
  const auth = useSelector((state: any) => state.auth);
  if (auth.isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <h2>
        <Button variant="contained">Login</Button>
      </h2>
    </div>
  );
};

export default Login;
