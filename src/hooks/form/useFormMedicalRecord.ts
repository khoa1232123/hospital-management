import { FieldErrType, KInputType, OptionsType } from "@/types/field";
import React, { useEffect, useMemo, useState } from "react";
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

const useFormMedicalRecord = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataSelected: dataUsers } = useUsers(10, { dataSelected: true });
  const { dataSelected: dataPatients } = usePatients(10, {
    dataSelected: true,
  });

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "text",
        name: "userId",
        label: "First Name",
        placeholder: "First Name",
        xs: 12,
        md: 6,
        xl: 6,
      },
      {
        type: "text",
        name: "lastName",
        label: "Last Name",
        placeholder: "Last Name",
        xs: 12,
        md: 6,
        xl: 6,
      },
      {
        type: "select",
        name: "userId",
        label: "Doctor",
        placeholder: "Doctor",
        select: true,
        xs: 4,
        md: 4,
        options: [...dataUsers],
      },
      {
        type: "select",
        name: "patientId",
        label: "Patient",
        placeholder: "Patient",
        select: true,
        xs: 4,
        md: 4,
        options: [...dataPatients],
      },
      {
        type: "datetime",
        name: "visitDate",
        label: "Visit Date",
        placeholder: "Visit Date",
        xs: 12,
        md: 6,
        xl: 6,
        focused: true,
      },
      {
        type: "text",
        name: "symptoms",
        label: "Symptoms",
        placeholder: "Symptoms",
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "diagnosis",
        label: "Diagnosis",
        placeholder: "Diagnosis",
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "treatment",
        label: "Treatment",
        placeholder: "Treatment",
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "datetime-local",
        name: "followUpDate",
        label: "Follow Up Date",
        placeholder: "Follow Up Date",
        xs: 12,
        md: 6,
        xl: 6,
        focused: true,
      },
    ];

    return fields.map((field) => ({
      ...field,
      value: data?.[field.name] || "",
      onChange,
    }));
  }, [fieldErrs, data, dataUsers, dataPatients]);

  return { fieldsForm };
};

export default useFormMedicalRecord;
