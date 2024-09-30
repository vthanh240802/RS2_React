/** @format */
import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import Input from "../components/Input";
import { validateForm } from "../util/validation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../store/action";
import { Navigate, useNavigate } from "react-router-dom";
import { login as handleLogin } from "../store/reducers/authReducer";
import { AppDispatch } from "../store/";

const Login = () => {
  const [email, setEmail] = useState(""); // controlled component
  const [password, setPassword] = useState(""); // asynchronous  (batch update)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);

  const [errorMsgs, setErrorMsg] = useState({
    email: "",
    password: "",
  });
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    email: null,
    password: null,
  });

  const handleSubmit = useCallback((event: { preventDefault: any }) => {
    console.log("submit ", inputRefs);
    event.preventDefault();

    if (inputRefs.current.email && inputRefs.current.password) {
      const email = inputRefs.current.email.value;
      const password = inputRefs.current.password.value;
      console.log("email ", email);
      console.log("password ", password);
      const errorMsgs = validateForm(email, password);
      setErrorMsg(errorMsgs);

      if (!errorMsgs.email && !errorMsgs.password) {
        dispatch(handleLogin({ email, password }));
      }
    }
  }, []); // [] didmount

  const handleChangeData = useCallback(
    (value: string, type: string) => {
      if (type === "password") {
        setPassword(value);
      } else {
        setEmail(value);
      }
    },
    [setPassword]
  );

  if (auth.isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="app">
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          border: "1px solid #c3c3c3",
          borderRadius: "5px",
          backgroundColor: "white",
          width: "400px",
          padding: "20px",
        }}
      >
        <Input
          label="email"
          value={email}
          onChange={handleChangeData} // create new arrow function
          ref={(element) => (inputRefs.current.email = element)}
          error={errorMsgs.email}
          // ref={emailRef}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={handleChangeData}
          // ref={passwordRef}
          ref={(element) => (inputRefs.current.password = element)}
          error={errorMsgs.password}
        />
        <Button
          variant="contained"
          disableElevation
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
