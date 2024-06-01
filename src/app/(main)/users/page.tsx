"use client";
import ActionFilters from "@/components/common/ActionFilters";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableUsers } from "@/constants/renderTable";
import { useDepartments, useUsers } from "@/hooks/firestore";
import { KInputType, OptionsType } from "@/types/field";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {};

const UsersPage = (props: Props) => {
  const {
    fieldsForm,
    open,
    allData,
    pagination,
    loading,
    setOpen,
    closeForm,
    deleteUser,
    submitUser,
    editUser,
    setFilters,
  } = useUsers(10, {
    allData: true,
  });

  const { dataSelected: dataDepartments } = useDepartments(10, {
    dataSelected: true,
  });

  console.log({ dataDepartments });

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Users</h2>
        <Button onClick={() => setOpen(true)}>create user</Button>
      </Box>

      <ActionFilters
        setFilters={setFilters}
        actions={{
          nameAndPhone: true,
          gender: true,
          clearBtn: true,
        }}
      />
      <KTable
        loading={loading}
        data={allData}
        moreData={[
          {
            name: "department",
            data: dataDepartments,
          },
        ]}
        pagination={pagination}
        keys={tableUsers}
        onEdit={editUser}
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
          {(fieldsForm as KInputType[]).map((props, index) => (
            <KRenderField key={index} {...props} />
          ))}
        </Grid>
      </KDialog>
    </div>
  );
};

export default UsersPage;
