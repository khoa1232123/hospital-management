"use client";
import { TabAppointments, TabMedicalRecords } from "@/components/main/patients";
import { useDepartments, usePatients, useUsers } from "@/hooks/firestore";
import { TabContext, TabPanel } from "@mui/lab";
import { Grid, Tab, Tabs } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";

const valueTabs = [
  { label: "Appointments", value: "appointments", Component: TabAppointments },
  {
    label: "Medical Records",
    value: "medicalRecords",
    Component: TabMedicalRecords,
  },
];

type Props = {};

const PatientIdPage = (props: Props) => {
  const { id } = useParams();
  const [value, setValue] = useState<string>(valueTabs[0].value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { data: patient } = usePatients(10, {
    docId: id as string,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={3}>
        <h1>{patient?.fullName}</h1>
        <p>Số điện thoại: {patient?.phone}</p>
        <p>Địa chỉ: {patient?.address}</p>
        <p>Email: {patient?.email}</p>
        <p>Giới tính: {patient?.gender}</p>
        <p>Ngày sinh: {patient?.birthday}</p>
      </Grid>
      <Grid item xs={8} md={9}>
        <TabContext value={value}>
          <Tabs
            key={0}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            TabScrollButtonProps={{
              style: {
                right: 0,
                position: "absolute",
              },
            }}
            style={{
              position: "relative",
            }}
            aria-label="scrollable force tabs example"
          >
            {valueTabs.map(({ label, value }) => (
              <Tab key={value} label={label} value={value} />
            ))}
          </Tabs>
          {valueTabs.map(({ value, Component }) => (
            <TabPanel value={value} key={value} className="px-0">
              <Component />
            </TabPanel>
          ))}
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default PatientIdPage;
