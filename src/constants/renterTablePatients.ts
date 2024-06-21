import { KeyConfigType } from "@/types/field";

export const tablePatientTabAppointments: KeyConfigType[] = [
  {
    value: "userName",
    label: "Doctor Name",
    align: "left",
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

export const tablePatientTabMedicalRecords: KeyConfigType[] = [
  {
    value: "userName",
    label: "Doctor",
    align: "left",
    component: "th",
  },
  {
    value: "visitDate",
    label: "Visit Date",
    align: "left",
    component: "th",
  },
  {
    value: "followUpDate",
    label: "Follow Up Date",
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
