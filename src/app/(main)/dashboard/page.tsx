"use client";
import TestTable from "@/components/TestTable";
import { KDialog } from "@/components/ui";
import KInput from "@/components/ui/KInput";
import KRenderField, { KRenderFieldProps } from "@/components/ui/KRenderField";
import { useFirestore, useUser } from "@/hooks/firestore";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState<CreateUserType>({
    email: "",
  });
  const { addUser, fieldsForm } = useUser();
  const {
    data,
    loading,
    addDocument,
    updateDocument,
    deleteDocument,
    goToPage,
    currentPage,
    totalPages,
    setFilters,
  } = useFirestore("users");

  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setFilters({ lastName: searchTerm });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="m-0">New Page</h1>
        <Button onClick={() => setOpen(true)}>Create New Page</Button>
      </div>
      <TestTable />
      <KDialog
        open={open}
        setOpen={setOpen}
        size="sm"
        title="Create User"
        onSubmit={addUser}
        submitText="Create"
      >
        <Grid container spacing={2}>
          {fieldsForm.map((item) => (
            <KRenderField {...item} />
          ))}
        </Grid>
      </KDialog>
    </div>
  );
};

export default DashboardPage;
