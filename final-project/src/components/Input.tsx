/** @format */
import { memo, forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  label: string;
  type?: string;
  value?: string;
  error?: string;
};
const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type = "text", value = "", error = "" }, ref) => {
    return (
      <TextField
        label={label}
        error={!!error}
        helperText={error}
        type={type}
        style={{ marginTop: "20px", display: "flex", flex: 1 }}
        inputRef={ref}
      />
    );
  }
);

export default Input;
