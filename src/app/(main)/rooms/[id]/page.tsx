"use client";
import { KDialog } from "@/components/ui";
import KTable from "@/components/ui/KTable";
import { useRooms } from "@/hooks/firestore";
import { TabContext, TabPanel } from "@mui/lab";
import { Grid, Tab, Tabs } from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const RoomSinglePage = (props: Props) => {
  const { id } = useParams();

  const { data: room } = useRooms(1, {
    docId: id as string,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={3}>
        <h1>Room: {room?.name}</h1>
        <p>Type: {room?.type}</p>
        <p>{room?.departmentId}</p>
      </Grid>
      <Grid item xs={8} md={9}>
        {/* <KTable
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
          keys={tablePatientTabAppointments}
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
            if (props.name === "patientId") props.disabled = true;
            return <KRenderField key={index} {...props} />;
          })}
        </Grid>
      </KDialog> */}
      </Grid>
    </Grid>
  );
};

export default RoomSinglePage;
