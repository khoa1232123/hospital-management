"use client";
import { useMainContext } from "@/contexts";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tablePatientTabMedicalRecords } from "@/constants";
import useMedicalRecords from "@/hooks/firestore/useMedicalRecords";
import { KInputType } from "@/types/field";
import { Box, Button, Grid } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const TabMedicalRecords = ({}: Props) => {
  const { id } = useParams();

  const { dataUsers, dataPatients } = useMainContext();

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
    setData,
  } = useMedicalRecords(
    10,
    {
      allData: true,
    },
    {
      patientId: id as string,
    }
  );

  useEffect(() => {
    setData((prev: any) => ({
      ...prev,
      patientId: id as string,
    }));
  }, [id]);

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Medical Records</h2>
        <Button onClick={() => setOpen(true)}>create Medical Record</Button>
      </Box>

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
        keys={tablePatientTabMedicalRecords}
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
          {(fieldsForm as KInputType[]).map((props, index) => {
            if (props.name === "patientId") props.disabled = true;
            return <KRenderField key={index} {...props} />;
          })}
        </Grid>
      </KDialog>
    </div>
  );
};

export default TabMedicalRecords;
