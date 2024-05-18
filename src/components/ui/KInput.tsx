import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  GridProps,
  Input,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";

export type KInputProps = TextFieldProps & GridProps & {};

const KInput = (props: KInputProps) => {
  return (
    <Grid item {...props}>
      <TextField
        style={{
          width: "100%",
        }}
        {...props}
      />
    </Grid>
  );
};

export default KInput;
