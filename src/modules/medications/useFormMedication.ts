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
};

const useFormMedication = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataPatients, dataUsers } = useMainContext();

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "text",
        name: "name",
        label: "Name",
        xs: 12,
        md: 12,
      },
      {
        type: "text",
        name: "description",
        label: "Description",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "sideEffects",
        label: "Side Effects",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "textarea",
        name: "dosage",
        label: "Dosage",
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
      placeholder: field.label,
      onChange,
    }));
  }, [fieldErrs, data, dataUsers, dataPatients]);

  return { fieldsForm };
};

export default useFormMedication;
