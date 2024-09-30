/** @format */
import { memo, forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (value: string, type: string) => void;
  error?: string;
};
const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, type = "text", value = "", onChange = () => {}, error = "" },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState(value);
    console.log("render " + label);
    return (
      <TextField
        label={label}
        defaultValue={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
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
