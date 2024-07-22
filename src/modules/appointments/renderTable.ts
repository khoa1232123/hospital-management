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
  },
  {
    value: "status",
    label: "Status",
    align: "center",
    component: "th",
  },
  {
    value: "departmentName",
    label: "Department",
    align: "left",
    component: "th",
  },
  {
    value: "appointmentDate",
    label: "Appointment Date",
    align: "left",
    component: "th",
  },
  {
    value: "createdAt",
    label: "Date Created",
    align: "left",
    component: "th",
  },
];
