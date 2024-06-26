import { KeyConfigType } from "@/types/field";

export const tablePatients: KeyConfigType[] = [
  {
    value: "fullName",
    label: "Full Name",
    align: "left",
    component: "th",
    isLink: true,
    preLink: "patients",
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
  },
  {
    value: "gender",
    label: "Gender",
    align: "left",
    component: "th",
  },
  {
    value: "phone",
    label: "Phone",
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
