import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tablePatientId } from "@/constants";
import {
  useAppointments,
  useDepartments,
  usePatients,
  useUsers,
} from "@/hooks/firestore";
import { Button, Grid } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const TabAppointments = (props: Props) => {
  const { id } = useParams();

  const { dataSelected: dataDepartments } = useDepartments(100, {
    dataSelected: true,
  });

  const { dataSelected: dataUsers } = useUsers(100, {
    dataSelected: true,
  });

  const {
    setFilters,
    allData: dataAppointments,
    loading,
    pagination,
    deleteAppointment,
    editAppointment,
    fieldsForm,
    open,
    closeForm,
    submitAppointment,
    setOpen,
  } = useAppointments(100, {
    allData: true,
  });

  useEffect(() => {
    if (id) {
      setFilters({ patientId: id as string });
    }
  }, [id]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Appointment</Button>
      <KTable
        loading={loading}
        data={dataAppointments}
        moreData={[
          {
            name: "department",
            data: dataDepartments,
          },
          {
            name: "user",
            data: dataUsers,
          },
        ]}
        pagination={pagination}
        keys={tablePatientId}
        onEdit={editAppointment}
        onDelete={deleteAppointment}
        isAction
      />
      <KDialog
        title="Patient"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitAppointment}
      >
        <Grid container spacing={2}>
          {fieldsForm.map((props, index) => {
            if (props.name === "patientId") {
              props.disabled = true;
              props.value = id as string;
            }
            return <KRenderField key={index} {...props} />;
          })}
        </Grid>
      </KDialog>
    </>
  );
};

export default TabAppointments;
