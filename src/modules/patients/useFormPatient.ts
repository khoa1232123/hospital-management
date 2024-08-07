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

const useFormPatient = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const fieldsForm: KInputType[] = useMemo(() => {
    const fields = [
      {
        type: "text",
        name: "email",
        label: "Email",
        helperText: fieldErrs?.email ? fieldErrs?.email : "",
        error: !!fieldErrs?.email,
        value: "",
        xs: 12,
        md: 12,
        xl: 12,
        onBlur,
        tabIndex: 0,
        required: true,
      },
      {
        type: "text",
        name: "firstName",
        label: "First Name",
        xs: 6,
        md: 6,
        xl: 6,
        required: true,
        helperText: fieldErrs?.firstName ? fieldErrs?.firstName : "",
        error: !!fieldErrs?.firstName,
      },
      {
        type: "text",
        name: "lastName",
        label: "Last Name",
        xs: 6,
        md: 6,
        xl: 6,
        required: true,
      },
      {
        type: "date",
        name: "birthday",
        label: "Birthday",
        focused: true,
        xs: 4,
        md: 4,
        xl: 4,
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
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
        xs: 4,
        md: 4,
        xl: 4,
        required: true,
      },
      {
        type: "text",
        name: "address",
        label: "Address",
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "emergencyContact",
        label: "Emergency Contact",
        xs: 6,
      },
      {
        type: "text",
        name: "insuranceNumber",
        label: "Insurance Number",
        xs: 6,
      },
      {
        type: "textarea",
        name: "medicalHistory",
        label: "Medical History",
        multiline: true,
        rows: 4,
        xs: 12,
        md: 12,
        xl: 12,
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

export default useFormPatient;
