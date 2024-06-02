"use client";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tablePatientId } from "@/constants/renterTablePatients";
import {
  useAppointments,
  useDepartments,
  usePatients,
  useUsers,
} from "@/hooks/firestore";
import { Button, Grid } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const PatientIdPage = (props: Props) => {
  const { id } = useParams();

  const { getPatients, data: patient } = usePatients(10, {
    docId: id as string,
  });

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
    getPatients;
  }, []);

  useEffect(() => {
    if (id) {
      setFilters({ patientId: id as string });
    }
  }, [id]);

  console.log({ dataAppointments, patient });

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <h1>{patient?.fullName}</h1>
        <p>{patient?.phone}</p>
        <p>{patient?.address}</p>
        <p>{patient?.email}</p>
        <p>{patient?.gender}</p>
        <p>{patient?.birthday}</p>
      </Grid>
      <Grid item xs={8}>
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
      </Grid>
    </Grid>
  );
};

export default PatientIdPage;
