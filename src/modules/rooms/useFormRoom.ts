import { dataRoomTypes } from "@/constants/staticData";
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

const useFormRoom = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataDepartments } = useMainContext();
  const fieldsForm: KInputType[] = useMemo(() => {
    const fields = [
      {
        type: "text",
        name: "name",
        label: "Room Number",
        placeholder: "Email",
        xs: 12,
        md: 12,
        xl: 12,
        tabIndex: 0,
        require: "true",
      },
      {
        type: "select",
        name: "departmentId",
        label: "Department",
        select: true,
        xs: 6,
        md: 6,
        xl: 6,
        options: dataDepartments,
      },
      {
        type: "select",
        name: "type",
        label: "Room Type",
        select: true,
        xs: 6,
        md: 6,
        xl: 6,
        options: dataRoomTypes,
      },
      {
        type: "number",
        name: "numberOfBed",
        label: "Number of Bedrooms",
        xs: 6,
        md: 6,
        xl: 6,
        inputProps: {
          min: 1,
          max: 20,
        },
      },
    ];

    return fields.map((field) => ({
      ...field,
      value: data?.[field.name] || "",
      placeholder: field.label || "",
      onChange,
    }));
  }, [fieldErrs, data, dataDepartments]);

  return { fieldsForm };
};

export default useFormRoom;
