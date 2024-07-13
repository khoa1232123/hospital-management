import { FieldErrType, KInputType } from "@/types/field";
import { rerenderForm } from "@/utils/array";
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
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "phone",
        label: "Phone number",
        xs: 6,
        md: 6,
        xl: 6,
        required: true,
      },
      {
        type: "text",
        name: "location",
        label: "Location",
        xs: 6,
        md: 6,
        xl: 6,
      },
    ];

    return rerenderForm(fields, data, onChange);
    // return fields.map((field) => ({
    //   ...field,
    //   value: data?.[field.name] || "",
    //   onChange,
    // }));
  }, [fieldErrs, data]);

  return { fieldsForm };
};

export default useFormDepartment;
