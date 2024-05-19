import { KInputType } from "@/types/field";
import KInput from "./KInput";

export type KRenderFieldProps = KInputType & {};

const KRenderField = ({ ...props }: KRenderFieldProps) => {
  switch (props.type) {
    case "text":
      return <KInput {...props} />;
    default:
      return <KInput {...props} />;
  }
};

export default KRenderField;
