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

const useFormPatient = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const fieldsForm: KInputType[] = useMemo(() => {
    const fields = [
      {
        type: "text",
        name: "email",
        label: "Email",
        placeholder: "Email",
        helperText: fieldErrs?.email ? fieldErrs?.email : "",
        error: !!fieldErrs?.email,
        xs: 12,
        md: 12,
        xl: 12,
        onBlur,
        tabIndex: 0,
        require: "true",
      },
      {
        type: "text",
        name: "firstName",
        label: "First Name",
        placeholder: "First Name",
        xs: 6,
        md: 6,
        xl: 6,
      },
      {
        type: "text",
        name: "lastName",
        label: "Last Name",
        placeholder: "Last Name",
        xs: 6,
        md: 6,
        xl: 6,
      },
      {
        type: "date",
        name: "birthday",
        label: "Birthday",
        placeholder: "Birthday",
        focused: true,
        xs: 4,
        md: 4,
        xl: 4,
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        placeholder: "Gender",
        select: true,
        xs: 4,
        md: 4,
        xl: 4,
        options: [
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
          {
            value: "other",
            label: "Other",
          },
        ],
      },
      {
        type: "text",
        name: "phone",
        label: "Phone number",
        placeholder: "Phone number",
        xs: 4,
        md: 4,
        xl: 4,
        require: "true",
      },
      {
        type: "text",
        name: "address",
        label: "Address",
        placeholder: "Address",
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "emergencyContact",
        label: "Emergency Contact",
        placeholder: "Emergency Contact",
        xs: 6,
      },
      {
        type: "text",
        name: "insuranceNumber",
        label: "Insurance Number",
        placeholder: "Insurance Number",
        xs: 6,
      },
      {
        type: "textarea",
        name: "medicalHistory",
        label: "Medical History",
        placeholder: "Medical History",
        multiline: true,
        rows: 4,
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
  }, [fieldErrs, data]);

  return { fieldsForm };
};

export default useFormPatient;
