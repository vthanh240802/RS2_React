/** @format */
import { useState, useCallback, useRef, useMemo } from "react";
import Input from "../components/Input";
import { validateForm } from "../utils/validation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState(""); // controlled component
  const [password, setPassword] = useState(""); // asynchronous  (batch update)
  const dispatch = useDispatch();
  const [errorMsgs, setErrorMsg] = useState({
    username: "",
    password: "",
  });
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    username: null,
    password: null,
  }); // uncontrolled component
  // const usernameRef = useRef<HTMLInputElement>(null); // uncontrolled component
  // const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((event: { preventDefault: any }) => {
    console.log("submit ", inputRefs);
    event.preventDefault();

    if (inputRefs.current.username && inputRefs.current.password) {
      const username = inputRefs.current.username.value;
      const password = inputRefs.current.password.value;
      console.log("username ", username);
      console.log("password ", password);
      const errorMsgs = validateForm(username, password);
      setErrorMsg(errorMsgs);

      if (!errorMsgs.username && !errorMsgs.password) {
        // dispatch Action
        // dispatch(login);
      }
    }
  }, []); // [] didmount

  const handleChangeData = useCallback(
    (value: string, type: string) => {
      if (type === "password") {
        setPassword(value);
      } else {
        setUsername(value);
      }
    },
    [setPassword]
  );

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
          label="Username"
          value={username}
          onChange={handleChangeData} // create new arrow function
          ref={(element) => (inputRefs.current.username = element)}
          // error={errorMsgs.username}
          // ref={usernameRef}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={handleChangeData}
          // ref={passwordRef}
          ref={(element) => (inputRefs.current.password = element)}
          // error={errorMsgs.password}
        />
        <Button
          variant="contained"
          disableElevation
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
        {/* <button type='submit'>Login</button> */}
      </Box>
    </div>
  );
};

export default Login;

// challenge 10:
/**
 * Complete the login form
 * applied useRef form
 * validate form:
 * 1. username is required
 * 2. password is required + length >= 8
 * Display the errors on the form if any
 */

// Challenge 11.2
/**
 * 1. Apply material UI for Login Form
 * 2. Handle login behaviors
 */
