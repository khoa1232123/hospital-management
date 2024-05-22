"use client";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tablePatients } from "@/constants/renderTable";
import { usePatients } from "@/hooks/firestore";
import { Box, Button, Grid } from "@mui/material";
import React from "react";

type Props = {};

const PatientsPage = (props: Props) => {
  const {
    submitPatient,
    setOpen,
    open,
    closeForm,
    fieldsForm,
    loading,
    allData,
    pagination,
    deletePatient,
    getPatientById,
  } = usePatients(10, true);

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
        keys={tablePatients}
        onEdit={(id) => {
          getPatientById(id);
          setOpen(true);
        }}
        onDelete={deletePatient}
        isAction
      />
      <KDialog
        title="Patient"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitPatient}
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

export default PatientsPage;
