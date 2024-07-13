import { useMainContext } from "@/contexts";
import { FieldErrType, KInputType } from "@/types/field";
import React, { useMemo } from "react";
import { usePatients } from "../patients";
import { useUsers } from "../users";
import { rerenderForm } from "@/utils/array";

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
  const {dataPatients, dataUsers} = useMainContext();
  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "select",
        name: "patientId",
        label: "Patient",
        select: true,
        xs: 6,
        md: 6,
        required: true,
        options: [...dataPatients],
        helperText: fieldErrs?.patientId ? fieldErrs?.patientId : "",
        error: !!fieldErrs?.patientId,
      },
      {
        type: "select",
        name: "userId",
        label: "Doctor",
        select: true,
        xs: 6,
        md: 6,
        required: true,
        options: [...dataUsers],
        helperText: fieldErrs?.userId ? fieldErrs?.userId : "",
        error: !!fieldErrs?.userId,
      },
      {
        type: "date",
        name: "visitDate",
        label: "Visit Date",
        xs: 12,
        md: 6,
        xl: 6,
        required: true,
        focused: true,
        helperText: fieldErrs?.visitDate ? fieldErrs?.visitDate : "",
        error: !!fieldErrs?.visitDate,
      },
      {
        type: "text",
        name: "purpose",
        label: "Purpose",
        helperText: fieldErrs?.purpose ? fieldErrs?.purpose : "",
        error: !!fieldErrs?.purpose,
        xs: 12,
        md: 12,
        xl: 12,
        onBlur,
        required: true,
        tabIndex: 0,
      },
      {
        type: "text",
        name: "notes",
        label: "Notes",
        focused: true,
        xs: 12,
        multiline: true,
        rows: 3,
      },
    ];

    return rerenderForm(fields, data, onChange);

    // return fields.map((field) => ({
    //   ...field,
    //   value: data?.[field.name] || "",
    //   onChange,
    // }));
  }, [fieldErrs, data, dataPatients, dataUsers]);

  return { fieldsForm };
};

export default useFormUser;
