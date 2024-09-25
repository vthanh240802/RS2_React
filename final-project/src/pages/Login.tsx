import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const auth = useSelector((state: any) => state.auth);
  if (auth.isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
};

export default Login;
