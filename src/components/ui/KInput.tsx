import { KInputType } from "@/types/field";
import { Grid, TextField } from "@mui/material";

type KInputProps = KInputType & {};

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
