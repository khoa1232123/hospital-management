import { KeyConfigType } from "@/types/field";

export const tableUsers: KeyConfigType[] = [
  {
    value: "fullName",
    label: "Full Name",
    align: "left",
    component: "th",
    width: 200,
    isLink: true,
    preLink: "users",
  },
  {
    value: "email",
    label: "Email",
    align: "left",
    component: "th",
    width: 300,
  },
  {
    value: "phone",
    label: "Phone",
    align: "left",
    component: "th",
    width: 120,
  },
  {
    value: "birthday",
    label: "Birthday",
    align: "left",
    component: "th",
    width: 110,
  },
  {
    value: "departmentName",
    label: "Department",
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
