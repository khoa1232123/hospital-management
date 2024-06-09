import { TextFieldProps } from "@mui/material";

type OptionsType = {
  value: string | number;
  label: string;
};

export type OptionStatusType = OptionsType & {
  color?: string;
};

export type OptionBuilding = OptionsType & {
  floors?: number;
};

type KInputType = TextFieldProps & {
  xs?: number;
  xl?: number;
  sm?: number;
  md?: number;
  options?: OptionsType[];
  type: string;
  array?: KInputType[];
  items?: KInputType[];
  onClick?: (ev?: MouseEvent) => void;
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
