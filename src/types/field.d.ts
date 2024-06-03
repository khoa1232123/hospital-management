import { TextFieldProps } from "@mui/material";

type OptionsType = {
  value: string | number;
  label: string;
};

type KInputType = TextFieldProps & {
  xs?: number;
  xl?: number;
  sm?: number;
  md?: number;
  options?: OptionsType[];
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
  isLink?: boolean = false;
  preLink?: string;
};
