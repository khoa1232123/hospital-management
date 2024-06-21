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

const useFormDepartment = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const fieldsForm: KInputType[] = useMemo(() => {
    const fields = [
      {
        type: "text",
        name: "name",
        label: "Department Name",
        placeholder: "Department Name",
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "phone",
        label: "Phone number",
        placeholder: "Phone number",
        xs: 6,
        md: 6,
        xl: 6,
        require: "true",
      },
      {
        type: "text",
        name: "location",
        label: "Location",
        placeholder: "Location",
        xs: 6,
        md: 6,
        xl: 6,
      },
    ];

    return fields.map((field) => ({
      ...field,
      value: data?.[field.name] || "",
      onChange,
    }));
  }, [fieldErrs, data]);

  return { fieldsForm };
};

export default useFormDepartment;
