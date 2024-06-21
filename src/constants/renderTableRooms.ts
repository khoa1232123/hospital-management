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

export const tableBedAssignments: KeyConfigType[] = [
  {
    value: "patientName",
    label: "Room Name",
    align: "left",
    component: "th",
  },
  {
    value: "admissionDate",
    label: "Admission Date",
    align: "left",
    component: "th",
  },
  {
    value: "dischargeDate",
    label: "Discharge",
    align: "left",
    component: "th",
  },
];
