import KInput, { KInputProps } from "./KInput";

export type KRenderFieldProps = KInputProps & {};

const KRenderField = ({ ...props }: KRenderFieldProps) => {
  switch (props.type) {
    case "text":
      return <KInput {...props} />;
    default:
      return <KInput {...props} />;
  }
};

export default KRenderField;
