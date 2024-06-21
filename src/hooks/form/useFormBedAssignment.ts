import { useMainContext } from "@/contexts";
import { FieldErrType, KInputType } from "@/types/field";
import React, { useMemo } from "react";

type Props = {
  fieldErrs?: FieldErrType;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  data: any | null;
  setData?: (data: any) => void;
};

const useFormBedAssignment = ({
  fieldErrs,
  onChange,
  onBlur,
  data,
  setData,
}: Props) => {
  const { dataPatients } = useMainContext();

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "text",
        name: "bedNumber",
        label: "Bed Number",
        xs: 6,
        md: 6,
      },
      {
        type: "select",
        name: "patientId",
        label: "Patient",
        select: true,
        xs: 6,
        md: 6,
        options: [...dataPatients],
      },
      {
        type: "date",
        name: "admissionDate",
        label: "Admission Date",
        focused: true,
        xs: 6,
        md: 6,
      },
      {
        type: "date",
        name: "dischargeDate",
        label: "Admission Date",
        focused: true,
        xs: 6,
        md: 6,
      },
    ];

    return fields.map((field) => {
      return {
        ...field,
        value: data?.[field?.name] || "",
        placeholder: field.label || "",
        onChange,
      };
    });
  }, [fieldErrs, data, dataPatients]);

  return { fieldsForm };
};

export default useFormBedAssignment;
