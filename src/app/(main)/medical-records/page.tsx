"use client";
import { useMainContext } from "@/contexts";
import ActionFilters from "@/components/common/ActionFilters";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableMedicalRecords } from "@/constants/renderTableMedicalRecords";
import useMedicalRecords from "@/hooks/firestore/useMedicalRecords";
import { KInputType } from "@/types/field";
import { Box, Button, Grid } from "@mui/material";

type Props = {};

const MedicalRecordsPage = (props: Props) => {
  const {
    fieldsForm,
    open,
    allData,
    pagination,
    loading,
    setOpen,
    closeForm,
    deleteMedicalRecord,
    submitMedicalRecord,
    editMedicalRecord,
    setFilters,
  } = useMedicalRecords(10, {
    allData: true,
  });

  const { dataPatients, dataUsers } = useMainContext();

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Medical Records</h2>
        <Button onClick={() => setOpen(true)}>create Medical Record</Button>
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
            name: "patient",
            data: dataPatients,
          },
          {
            name: "user",
            data: dataUsers,
          },
        ]}
        pagination={pagination}
        keys={tableMedicalRecords}
        onEdit={editMedicalRecord}
        onDelete={deleteMedicalRecord}
        isAction
      />
      <KDialog
        title="User"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitMedicalRecord}
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

export default MedicalRecordsPage;
