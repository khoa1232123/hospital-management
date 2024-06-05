import { FieldErrType, KInputType } from "@/types/field";
import React, { useMemo } from "react";
import { useDepartments, usePatients, useUsers } from "../firestore";
import { useMainContext } from "@/contexts";

type Props = {
  fieldErrs?: FieldErrType;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  data: any | null;
};

const useFormAppointment = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataDepartments, dataPatients, dataUsers } = useMainContext();

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "date",
        name: "appointmentDate",
        label: "Appointment Date",
        placeholder: "Appointment Date",
        xs: 12,
        md: 6,
        xl: 6,
        focused: true,
      },
      {
        type: "select",
        name: "userId",
        label: "User",
        placeholder: "User",
        select: true,
        xs: 12,
        md: 6,
        xl: 6,
        options: dataUsers,
      },
      {
        type: "select",
        name: "patientId",
        label: "Patient",
        placeholder: "Patient",
        select: true,
        xs: 12,
        md: 6,
        xl: 6,
        options: dataPatients,
      },
      {
        type: "select",
        name: "departmentId",
        label: "Department",
        placeholder: "Department",
        select: true,
        xs: 12,
        md: 6,
        xl: 6,
        options: dataDepartments,
      },
    ];

    return fields.map((field) => ({
      ...field,
      value: data?.[field.name] || "",
      onChange,
    }));
  }, [fieldErrs, data, dataDepartments, dataUsers, dataPatients]);

  return { fieldsForm };
};

export default useFormAppointment;
