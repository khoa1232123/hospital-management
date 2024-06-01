"use client";
import ActionFilters from "@/components/common/ActionFilters";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tablePatients } from "@/constants/renderTable";
import { usePatients } from "@/hooks/firestore";
import { Box, Button, Grid } from "@mui/material";

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
    editPatient,
    deletePatient,
    setFilters,
    setSortBy,
  } = usePatients(10, {
    allData: true,
  });

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Patients</h2>
        <Button onClick={() => setOpen(true)}>create patient</Button>
      </Box>
      <ActionFilters
        setFilters={setFilters}
        actions={{
          nameAndPhone: true,
          gender: true,
        }}
      />
      <KTable
        loading={loading}
        data={allData}
        pagination={pagination}
        keys={tablePatients}
        onEdit={editPatient}
        onDelete={deletePatient}
        onSortBy={setSortBy}
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
