import { FieldErrType, KInputType, OptionsType } from "@/types/field";
import React, { useEffect, useMemo, useState } from "react";
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

const useFormMedicalRecord = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataPatients, dataUsers } = useMainContext();

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "select",
        name: "userId",
        label: "Doctor",
        placeholder: "Doctor",
        select: true,
        xs: 6,
        md: 6,
        options: [...dataUsers],
      },
      {
        type: "select",
        name: "patientId",
        label: "Patient",
        placeholder: "Patient",
        select: true,
        xs: 6,
        md: 6,
        options: [...dataPatients],
      },
      {
        type: "datetime-local",
        name: "visitDate",
        label: "Visit Date",
        placeholder: "Visit Date",
        xs: 12,
        md: 6,
        xl: 6,
        focused: true,
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
      {
        type: "text",
        name: "symptoms",
        label: "Symptoms",
        placeholder: "Symptoms",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "diagnosis",
        label: "Diagnosis",
        placeholder: "Diagnosis",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "textarea",
        name: "treatment",
        label: "Treatment",
        placeholder: "Treatment",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
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
