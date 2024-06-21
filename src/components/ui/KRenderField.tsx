import { KInputType } from "@/types/field";
import KInput from "./KInput";
import { Button, Grid, MenuItem } from "@mui/material";
import { Add, PlusOne } from "@mui/icons-material";

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
    case "array":
      return (
        <Grid item xs={12}>
          <div className="flex items-center justify-between">
            <h3 className="mt-0">{props.label}</h3>
            <Button
              onClick={() => {
                props.onClick && props.onClick();
              }}
            >
              <Add />
            </Button>
          </div>
          <Grid container spacing={3}>
            {props.array?.map((item) => (
              <Grid key={item.name} item xs={12}>
                <KRenderField {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      );
    case "arrayItems":
      return (
        <Grid container spacing={2}>
          {props.items?.map((item) => (
            <KRenderField key={item.name} {...item} />
          ))}
        </Grid>
      );
    default:
      return <KInput {...props} />;
  }
};

export default KRenderField;
