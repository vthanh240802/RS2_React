export const validateForm = function (email: string, password: string) {
  const errors = {
    email: "",
    password: "",
  };

  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
    return errors;
  }

  if (password.length < 8) {
    errors.password = "Password is at least 8 letters";
  }

  return errors;
};
