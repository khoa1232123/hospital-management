import { KeyConfigType } from "@/types/field";

export const tableMedications: KeyConfigType[] = [
  {
    value: "name",
    label: "Medication Name",
    align: "left",
    component: "th",
    isLink: true,
    preLink: "medications",
  },
  {
    value: "description",
    label: "Description",
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
