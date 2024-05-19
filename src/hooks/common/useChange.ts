import checkFieldExists from "@/common/checkFieldExists";
import { FieldErrType } from "@/types/field";
import React, { useState } from "react";

type Props = {
  setData: React.Dispatch<React.SetStateAction<any | null>>;
  data: any;
  collectionName: string;
};

const useChange = ({ setData, data, collectionName }: Props) => {
  const [fieldErrs, setFieldErrs] = useState<FieldErrType>({});

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setData({
      ...data,
      [name]: e.target.value,
    });
    if (fieldErrs?.[name]) {
      delete fieldErrs?.[name];
      setFieldErrs(fieldErrs);
    }
  };

  const checkField = async (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const fieldExists = await checkFieldExists(collectionName, {
      [name]: value,
    });
    if (fieldExists) {
      setFieldErrs({ ...fieldErrs, [name]: `${value} already exists` });
    } else {
      delete fieldErrs?.[name];

      setFieldErrs(fieldErrs);
    }
  };

  return { fieldErrs, onChange: handleOnChange, checkField };
};

export default useChange;