import { KeyConfigType } from "@/types/field";

export const tableRooms: KeyConfigType[] = [
  {
    value: "name",
    label: "Name",
    align: "left",
    component: "th",
    isLink: true,
    preLink: "rooms",
  },
  {
    value: "departmentName",
    label: "Department Name",
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
