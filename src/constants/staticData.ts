import { OptionBuilding, OptionStatusType, OptionsType } from "@/types/field";

export const dataStatusMore: OptionStatusType[] = [
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
  {
    label: "Out of Date",
    value: "outOfDate",
    color: "black",
  },
];

export const dataStatus: OptionsType[] = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Cancel",
    value: "cancel",
  },
];

export const dataGender: OptionsType[] = [
  {
    label: "--Gender--",
    value: "",
  },
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

export const dataRoomTypes: OptionsType[] = [
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "VIP",
    value: "vip",
  },
];

export const dataBuildings: OptionBuilding[] = [
  {
    label: "A1",
    value: "a1",
    floors: 5,
  },
  {
    label: "A2",
    value: "a2",
    floors: 6,
  },
  {
    label: "B1",
    value: "b1",
    floors: 4,
  },
  {
    label: "B2",
    value: "b2",
    floors: 4,
  },
  {
    label: "C1",
    value: "c1",
    floors: 6,
  },
];
