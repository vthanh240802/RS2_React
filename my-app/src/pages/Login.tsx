import { useState, useCallback, useRef } from "react";
import Input from "../components/Input";

const Login = () => {
  const [userName, setUserName] = useState(""); // controlled component
  const [passWord, setPassWord] = useState("");
  const [errors, setErrors] = useState<{
    userName?: string;
    passWord?: string;
  }>({});
  const userNameRef = useRef<HTMLInputElement>(null); // uncontrolled component
  const passWordRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<{ [key: string]: HTMLInputElement | null }>({
    userName: null,
    passWord: null,
  });
  //   const handleSubmit = useCallback((event: {preventDefault: any})) => {
  //     console.log("Ref", userNameRef);

  //     event.preventDefault();
  //     // console.log("username: ", userName);
  //     // console.log("password: ", passWord);
  //     if (userNameRef.current && passWordRef.current) {
  //       const username = userNameRef.current.value;
  //       const password = passWordRef.current.value;
  //       console.log("username: ", username);
  //       console.log("password: ", password);
  //     }
  //   };

  const validateForm = () => {
    const newErrors: { userName?: string; passWord?: string } = {};
    if (!inputRef.current.userName?.value) {
      newErrors.userName = "Tên đăng nhập là bắt buộc.";
    }
    if (
      !inputRef.current.passWord?.value ||
      inputRef.current.passWord.value.length < 8
    ) {
      newErrors.passWord = "Mật khẩu là bắt buộc và phải từ 8 ký tự trở lên.";
    }
    return newErrors;
  };
  const handleSubmit = useCallback(
    (event: { preventDefault: any }) => {
      console.log("Ref", userNameRef);
      console.log("Ref", passWordRef);
      event.preventDefault();
      // console.log("username: ", userName);
      // console.log("password: ", passWord);
      //   if (userNameRef.current && passWordRef.current) {
      //     const username = userNameRef.current.value;
      //     const password = passWordRef.current.value;
      //     console.log("username: ", username);
      //     console.log("password: ", password);
      //   }
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      if (inputRef.current.userName && inputRef.current.passWord) {
        const username = inputRef.current.userName.value;
        const password = inputRef.current.passWord.value;
        console.log("username: ", username);
        console.log("password: ", password);
      }
      console.log("Input refL:", inputRef);
    },
    [userName, passWord]
  );

  const handleChangeData = useCallback(
    (value: string, type: string) => {
      if (type === "password") {
        setPassWord(value);
      } else setUserName(value);
    },
    [setPassWord]
  );
  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={(element) => (inputRef.current.userName = element)}
        label="Username"
        value={userName}
        onChange={handleChangeData}
      />
      {errors.userName && (
        <span style={{ color: "red" }}>{errors.userName}</span>
      )}
      <Input
        ref={(element) => (inputRef.current.passWord = element)}
        label="Password"
        type="password"
        value={passWord}
        onChange={handleChangeData}
      />
      {errors.passWord && (
        <span style={{ color: "red" }}>{errors.passWord}</span>
      )}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
