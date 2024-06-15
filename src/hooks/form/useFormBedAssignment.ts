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
  const { dataPatients, dataUsers } = useMainContext();

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "select",
        name: "userId",
        label: "Doctor",
        placeholder: "Doctor",
        select: true,
        xs: 6,
        md: 6,
        options: [...dataUsers],
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
  }, [fieldErrs, data, dataUsers, dataPatients]);

  return { fieldsForm };
};

export default useFormBedAssignment;
