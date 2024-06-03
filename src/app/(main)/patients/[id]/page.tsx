"use client";
import TabAppointments from "@/components/main/patients/TabAppointments";
import TabHello from "@/components/main/patients/TabHello";
import TabMedicalRecords from "@/components/main/patients/TabMedicalRecords";
import { usePatients } from "@/hooks/firestore";
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
  { label: "Hello", value: "hello", Component: TabHello },
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
        <p>{patient?.phone}</p>
        <p>{patient?.address}</p>
        <p>{patient?.email}</p>
        <p>{patient?.gender}</p>
        <p>{patient?.birthday}</p>
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
            aria-label="scrollable force tabs example"
          >
            {valueTabs.map(({ label, value }) => (
              <Tab key={value} label={label} value={value} />
            ))}
          </Tabs>
          {valueTabs.map(({ value, Component }) => (
            <TabPanel value={value} key={value}>
              <Component />
            </TabPanel>
          ))}
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default PatientIdPage;
