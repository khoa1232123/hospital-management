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
    value: "roomName",
    label: "Room",
    align: "left",
    component: "th",
  },
  {
    value: "room.bedNumber",
    label: "Bed Number",
    align: "left",
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
