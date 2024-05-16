import {
  FormControl,
  FormControlLabel,
  Input,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";

const height = 50;
const labelOffset = -2;

type Props = TextFieldProps & {};

const KInput = (props: Props) => {
  return (
    <TextField
      style={{
        width: "100%",
      }}
      {...props}
    />
  );
};

export default KInput;
