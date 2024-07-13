import { useMainContext } from "@/contexts";
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

const useFormUser = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataDepartments } = useMainContext();

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "text",
        name: "firstName",
        label: "First Name",
        xs: 12,
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
        xs: 12,
        md: 6,
        xl: 6,
        required: true,
        helperText: fieldErrs?.lastName ? fieldErrs?.lastName : "",
        error: !!fieldErrs?.lastName,
      },
      {
        type: "text",
        name: "email",
        label: "Email",
        helperText: fieldErrs?.email ? fieldErrs?.email : "",
        error: !!fieldErrs?.email,
        xs: 12,
        md: 12,
        xl: 12,
        onBlur,
        required: true,
        tabIndex: 0,
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
        helperText: fieldErrs?.phone ? fieldErrs?.phone : "",
        error: !!fieldErrs?.phone,
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
        name: "position",
        label: "Position",
        xs: 6,
        md: 6,
        xl: 6,
      },
      {
        type: "select",
        name: "role",
        label: "Role",
        select: true,
        xs: 6,
        md: 6,
        xl: 6,
        options: [
          {
            value: "admin",
            label: "Admin",
          },
          {
            value: "user",
            label: "User",
          },
        ],
      },
      {
        type: "date",
        name: "dateHired",
        label: "Date Hired",
        focused: true,
        xs: 4,
        md: 4,
        xl: 4,
      },
      {
        type: "number",
        name: "salary",
        label: "Salary",
        xs: 4,
        md: 4,
        xl: 4,
      },
      {
        type: "text",
        name: "shirt",
        label: "Shift",
        xs: 4,
        md: 4,
        xl: 4,
      },
      {
        type: "select",
        name: "departmentId",
        label: "Department",
        select: true,
        xs: 4,
        md: 4,
        options: dataDepartments,
      },
    ];
    
    return rerenderForm(fields, data, onChange);

    // return fields.map((field) => ({
    //   ...field,
    //   value: data?.[field.name] || "",
    //   onChange,
    // }));
  }, [fieldErrs, data, dataDepartments]);

  return { fieldsForm };
};

export default useFormUser;
