"use client";
import TestTable from "@/components/TestTable";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import { DATATABLES } from "@/constants";
import { useFirestore, useUser } from "@/hooks/firestore";
import { convertNumberToArray } from "@/utils/array";
import { Button, Grid } from "@mui/material";
import { useEffect } from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  const {
    addUser,
    fieldsForm,
    open,
    setOpen,
    getUsers,
    allData,
    goToPage,
    totalPages,
  } = useUser(2);

  // const { allData, getDocuments } = useFirestore(DATATABLES.USERS);

  // useEffect(() => {
  //   getDocuments(1);
  // }, []);

  useEffect(() => {
    getUsers(1);
  }, []);

  console.log({ allData });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="m-0">New Page</h1>
        <Button onClick={() => setOpen(true)}>Create New Page</Button>
      </div>
      {convertNumberToArray(totalPages).map((item) => (
        <Button key={item} onClick={() => goToPage(item)}>
          {item}
        </Button>
      ))}
      <KDialog
        open={open}
        setOpen={setOpen}
        size="sm"
        title="Create User"
        onSubmit={addUser}
        submitText="Create"
      >
        <Grid container spacing={2}>
          {fieldsForm.map((item, index) => (
            <KRenderField key={index} {...item} />
          ))}
        </Grid>
      </KDialog>
    </div>
  );
};

export default DashboardPage;
