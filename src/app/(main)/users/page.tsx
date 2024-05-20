"use client";
import TestTable from "@/components/TestTable";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableUsers } from "@/constants/renderTable";
import { useUser } from "@/hooks/firestore";
import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";

type Props = {};

const UsersPage = (props: Props) => {
  const {
    addUser,
    fieldsForm,
    open,
    setOpen,
    getUsers,
    getUserById,
    allData,
    pagination,
    loading,
    closeForm,
    updateUser,
    deleteUser,
    submitUser,
    data,
  } = useUser(10, true);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>hello</Button>
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
