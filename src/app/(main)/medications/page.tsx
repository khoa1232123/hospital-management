"use client";
import ActionFilters from "@/components/common/ActionFilters";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableMedications } from "@/constants";
import { useDepartments, useMedications } from "@/hooks/firestore";
import { KInputType } from "@/types/field";
import { Box, Button, Grid } from "@mui/material";

type Props = {};

const MedicationsPage = (props: Props) => {
  const {
    fieldsForm,
    open,
    allData,
    pagination,
    loading,
    setOpen,
    closeForm,
    deleteMedication,
    submitMedication,
    editMedication,
    setFilters,
  } = useMedications(10, {
    allData: true,
  });

  const { dataSelected: dataDepartments } = useDepartments(10, {
    dataSelected: true,
  });

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Medications</h2>
        <Button onClick={() => setOpen(true)}>Create Medication</Button>
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
        keys={tableMedications}
        onEdit={editMedication}
        onDelete={deleteMedication}
        actionMaxWidth={100}
        isAction
      />
      <KDialog
        title="Medication"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitMedication}
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

export default MedicationsPage;
