import { KeyConfigType } from "@/types/field";

export const tableAppointments: KeyConfigType[] = [
  {
    value: "userName",
    label: "Doctor",
    align: "left",
    component: "th",
  },
  {
    value: "patientName",
    label: "Patient",
    align: "left",
    component: "th",
    width: 200
  },
  {
    value: "status",
    label: "Status",
    align: "center",
    component: "th",
    width: 125
  },
  {
    value: "departmentName",
    label: "Department",
    align: "left",
    component: "th",
    width: 160
  },
  {
    value: "appointmentDate",
    label: "Appointment Date",
    align: "left",
    component: "th",
    width: 150
  },
  {
    value: "createdAt",
    label: "Date Created",
    align: "left",
    component: "th",
    width: 120
  },
];
