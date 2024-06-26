import { KeyConfigType } from "@/types/field";

export const tableMedicalRecords: KeyConfigType[] = [
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
