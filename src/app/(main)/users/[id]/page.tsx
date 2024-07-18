"use client"
import { useMainContext } from "@/contexts";
import { useUsers } from "@/modules/users";
import { TabContext } from "@mui/lab";
import { Grid, Tab, Tabs } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const valueTabs = [
  {
    label: "Appointments",
    value: "appointments",
    // Component: TabAppointments,
  },
  {
    label: "Medical Records",
    value: "medicalRecords",
    // Component: TabMedicalRecords,
  },
  {
    label: "Visits",
    value: "visits",
    // Component: TabVisits,
  }
];

type Props = {};

const UserIdPage = (props: Props) => {
  const { id } = useParams();
  const [value, setValue] = useState<string>(valueTabs[0].value);
  const { getLabelById } = useMainContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { data: user } = useUsers(10, {
    docId: id as string,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={3}>
        <h1 className="mt-0">{user?.fullName}</h1>
        <p>Số điện thoại: {user?.phone}</p>
        <p>Địa chỉ: {user?.address}</p>
        <p>Email: {user?.email}</p>
        <p>Giới tính: {user?.gender}</p>
        <p>Ngày sinh: {user?.birthday}</p>
        <p>Khoa: {getLabelById(user?.departmentId)}</p>
        <p>Vị trí: {user?.position}</p>
        <p>Vai trò: {user?.role}</p>
        <p>Lương: {user?.salary}</p>
        <p>Ca làm: {user?.shift}</p>
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
          {/* {valueTabs.map(({ value, Component }) => (
            <TabPanel value={value} key={value} className="px-0">
              <Component />
            </TabPanel>
          ))} */}
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default UserIdPage;
