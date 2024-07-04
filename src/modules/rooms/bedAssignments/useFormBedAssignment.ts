import { useMainContext } from "@/contexts";
import { FieldErrType, KInputType, OptionsType } from "@/types/field";
import { convertNumberToOptions } from "@/utils/array";
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
  numberOfBed?: number;
};

const useFormBedAssignment = ({
  fieldErrs,
  onChange,
  onBlur,
  data,
  setData,
  numberOfBed = 0,
}: Props) => {
  const { dataPatients } = useMainContext();

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "select",
        name: "bedNumber",
        label: "Bed Number",
        select: true,
        xs: 6,
        md: 6,
        options: convertNumberToOptions(numberOfBed),
        required: true,
        helperText: fieldErrs?.bedNumber ? fieldErrs?.bedNumber : "",
        error: !!fieldErrs?.bedNumber,
      },
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
        type: "date",
        name: "admissionDate",
        label: "Admission Date",
        focused: true,
        xs: 6,
        md: 6,
        required: true,
        helperText: fieldErrs?.admissionDate ? fieldErrs?.admissionDate : "",
        error: !!fieldErrs?.admissionDate,
      },
      {
        type: "date",
        name: "dischargeDate",
        label: "Admission Date",
        focused: true,
        xs: 6,
        md: 6,
        required: true,
        helperText: fieldErrs?.dischargeDate ? fieldErrs?.dischargeDate : "",
        error: !!fieldErrs?.dischargeDate,
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
  }, [fieldErrs, data, dataPatients, numberOfBed]);

  return { fieldsForm };
};

export default useFormBedAssignment;
