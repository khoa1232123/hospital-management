import { OptionsType } from "@/types/field";

type OptionStatusType = OptionsType & {
  color?: string;
};

export const dataStatus: OptionStatusType[] = [
  {
    label: "Pending",
    value: "pending",
    color: "yellow",
  },
  {
    label: "Done",
    value: "done",
    color: "green",
  },
  {
    label: "Cancel",
    value: "cancel",
    color: "red",
  },
];

export const dataGender: OptionsType[] = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];
