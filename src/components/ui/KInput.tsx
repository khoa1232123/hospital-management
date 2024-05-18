import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  GridProps,
  Input,
  TextField,
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material";
import React from "react";

export type KInputProps = TextFieldProps & {
  xs?: number;
  xl?: number;
  sm?: number;
  md?: number;
};

const KInput = ({ xs, xl, sm, md, ...props }: KInputProps) => {
  return (
    <Grid item xs={xs} xl={xl} sm={sm} md={md}>
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
