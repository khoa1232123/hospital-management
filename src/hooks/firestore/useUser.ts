import { KRenderFieldProps } from "@/components/ui/KRenderField";
import { useFirestore } from ".";
import { useState } from "react";

const useUser = () => {
  const { addDocument, updateDocument } = useFirestore("users");

  const [fieldsData, setFieldsData] = useState<
    CreateUserType | UpdateUserType | null
  >(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async () => {
    const newData = {
      ...fieldsData,
      fullName: fieldsData?.firstName + " " + fieldsData?.lastName,
      fullNameSearch: (
        fieldsData?.firstName +
        " " +
        fieldsData?.lastName
      ).toLowerCase(),
    };
    await addDocument(newData);
  };

  const updateUser = async (id: string, data: UpdateUserType) => {
    await updateDocument(id, data);
  };

  const fieldsForm: KRenderFieldProps[] = [
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "Email",
      helperText: "Email",
      error: true,
      xs: 12,
      md: 12,
      xl: 12,
      onChange: handleOnChange,
      value: fieldsData?.email || "",
    },
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      helperText: "First Name",
      error: true,
      xs: 12,
      md: 6,
      xl: 6,
      onChange: handleOnChange,
      value: fieldsData?.firstName || "",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      helperText: "Last Name",
      error: true,
      xs: 12,
      md: 6,
      xl: 6,
      onChange: handleOnChange,
      value: fieldsData?.lastName || "",
    },
  ];

  return { addUser, updateUser, fieldsForm };
};

export default useUser;
