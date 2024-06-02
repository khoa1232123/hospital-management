import { FieldErrType, KInputType } from "@/types/field";
import React, { useMemo } from "react";
import { useDepartments, usePatients, useUsers } from "../firestore";

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

const useFormUser = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataSelected: dataDepartments } = useDepartments(100, {
    dataSelected: true,
  });
  const { dataSelected: dataUsers } = useUsers(10, {
    dataSelected: true,
  });
  const { dataSelected: dataPatients } = usePatients(10, {
    dataSelected: true,
  });

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
        options: [...dataUsers],
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
        options: [...dataPatients],
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
        options: [...dataDepartments],
      },
    ];

    return fields.map((field) => ({
      ...field,
      value: data?.[field.name] || "",
      onChange,
    }));
  }, [fieldErrs, data, dataDepartments, dataUsers]);

  return { fieldsForm };
};

export default useFormUser;
