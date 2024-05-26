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

const useFormUser = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const fieldsForm: KInputType[] = useMemo(() => {
    return [
      {
        type: "text",
        name: "firstName",
        label: "First Name",
        placeholder: "First Name",
        xs: 12,
        md: 6,
        xl: 6,
        onChange,
        value: data?.firstName || "",
      },
      {
        type: "text",
        name: "lastName",
        label: "Last Name",
        placeholder: "Last Name",
        xs: 12,
        md: 6,
        xl: 6,
        onChange,
        value: data?.lastName || "",
      },
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
        onChange,
        onBlur,
        value: data?.email || "",
        tabIndex: 0,
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
        onChange,
        value: data?.birthday || "",
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
        onChange,
        value: data?.gender || "",
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
        onChange,
        require: true,
        value: data?.phone || "",
      },
      {
        type: "text",
        name: "address",
        label: "Address",
        placeholder: "Address",
        xs: 12,
        md: 12,
        xl: 12,
        onChange,
        value: data?.address || "",
      },
      {
        type: "text",
        name: "position",
        label: "Position",
        placeholder: "Position",
        xs: 6,
        md: 6,
        xl: 6,
        onChange,
        value: data?.position || "",
      },
      {
        type: "select",
        name: "role",
        label: "Role",
        placeholder: "Role",
        select: true,
        xs: 6,
        md: 6,
        xl: 6,
        onChange,
        value: data?.role || "",
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
        placeholder: "Date Hired",
        focused: true,
        xs: 4,
        md: 4,
        xl: 4,
        onChange,
        value: data?.dateHired || "",
      },
      {
        type: "number",
        name: "salary",
        label: "Salary",
        placeholder: "Salary",
        xs: 4,
        md: 4,
        xl: 4,
        onChange,
        value: data?.salary || "",
      },
      {
        type: "text",
        name: "shirt",
        label: "Shift",
        placeholder: "shirt",
        xs: 4,
        md: 4,
        xl: 4,
        onChange,
        value: data?.shirt || "",
      },
    ];
  }, [fieldErrs, data]);

  return { fieldsForm };
};

export default useFormUser;
