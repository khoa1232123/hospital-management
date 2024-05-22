"use client";
import TestTable from "@/components/TestTable";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableUsers } from "@/constants/renderTable";
import { useUsers } from "@/hooks/firestore";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";

type Props = {};

const UsersPage = (props: Props) => {
  const {
    fieldsForm,
    open,
    setOpen,
    getUserById,
    allData,
    pagination,
    loading,
    closeForm,
    deleteUser,
    submitUser,
  } = useUsers(10, true);

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Users</h2>
        <Button onClick={() => setOpen(true)}>create user</Button>
      </Box>
      <KTable
        loading={loading}
        data={allData}
        pagination={pagination}
        keys={tableUsers}
        onEdit={(id) => {
          getUserById(id);
          setOpen(true);
        }}
        onDelete={deleteUser}
        isAction
      />
      <KDialog
        title="User"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitUser}
      >
        <Grid container spacing={2}>
          {fieldsForm.map((props, index) => (
            <KRenderField key={index} {...props} />
          ))}
        </Grid>
      </KDialog>
    </div>
  );
};

export default UsersPage;
