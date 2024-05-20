import { TextFieldProps } from "@mui/material";

type KInputType = TextFieldProps & {
  xs?: number;
  xl?: number;
  sm?: number;
  md?: number;
};

type FieldErrType = {
  [field: string]: string;
};

type KeyConfigType = {
  value: string;
  label?: string;
  align?: "left" | "right" | "center" | "inherit" | "justify";
  component?: "th" | "td";
  width?: number;
};
