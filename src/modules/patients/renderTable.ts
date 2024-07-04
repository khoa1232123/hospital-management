import { KeyConfigType } from "@/types/field";

export const tablePatients: KeyConfigType[] = [
  {
    value: "fullName",
    label: "Full Name",
    align: "left",
    component: "th",
    isLink: true,
    preLink: "patients",
    width: 200,
  },
  {
    value: "email",
    label: "Email",
    align: "left",
    component: "th",
  },
  {
    value: "birthday",
    label: "Birthday",
    align: "left",
    component: "th",
    width: 120,
  },
  {
    value: "gender",
    label: "Gender",
    align: "center",
    component: "th",
  },
  {
    value: "phone",
    label: "Phone",
    align: "left",
    component: "th",
  },
  {
    value: "roomName",
    label: "Room",
    align: "center",
    component: "th",
  },
  {
    value: "bedNumber",
    label: "Bed Number",
    align: "center",
    component: "th",
  },
  {
    value: "createdAt",
    label: "Date Created",
    align: "left",
    component: "th",
    width: 120,
  },
];
