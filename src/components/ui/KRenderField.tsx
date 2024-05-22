import { KInputType } from "@/types/field";
import KInput from "./KInput";
import { MenuItem } from "@mui/material";

export type KRenderFieldProps = KInputType & {};

const KRenderField = ({ ...props }: KRenderFieldProps) => {
  switch (props.type) {
    case "text":
      return <KInput {...props} />;
    case "select":
      return (
        <KInput {...props}>
          {props.options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </KInput>
      );
    default:
      return <KInput {...props} />;
  }
};

export default KRenderField;
