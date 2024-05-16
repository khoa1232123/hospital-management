"use client";
import TestTable from "@/components/TestTable";
import { KDialog } from "@/components/ui";
import KInput from "@/components/ui/KInput";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="m-0">New Page</h1>
        <Button onClick={() => setOpen(true)}>Create New Page</Button>
      </div>
      <TestTable />
      <KDialog open={open} setOpen={setOpen} size="sm" title="Create Page">
        <Grid className="flex flex-col gap-4">
          <KInput name="hello" placeholder="hello" label="hello" />
          <KInput name="hello" placeholder="hello" label="hello" />
          <KInput name="hello" placeholder="hello" label="hello" />
        </Grid>
      </KDialog>
    </div>
  );
};

export default DashboardPage;
