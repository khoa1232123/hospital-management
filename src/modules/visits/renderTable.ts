import { KeyConfigType } from "@/types/field";

export const tableVisits: KeyConfigType[] = [
  {
    value: "patientName",
    label: "Patient",
    align: "left",
    component: "th",
    width: 200,
  },
  {
    value: "userName",
    label: "Doctor",
    align: "left",
    component: "th",
    width: 200,
  },
  {
    value: "visitDate",
    label: "Visit Date",
    align: "left",
    component: "th",
    width: 120,
  },
  {
    value: "purpose",
    label: "Purpose",
    align: "left",
    component: "th",
    width: 110,
  },
  {
    value: "notes",
    label: "notes",
    align: "left",
    component: "th",
    width: 200,
  },
  {
    value: "createdAt",
    label: "Date Created",
    align: "left",
    component: "th",
    width: 120,
  },
];
