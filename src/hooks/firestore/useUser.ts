import checkFieldExists from "@/common/checkFieldExists";
import { KRenderFieldProps } from "@/components/ui/KRenderField";
import { DATATABLES } from "@/constants";
import { useMemo, useState } from "react";
import { useFirestore } from ".";

type FieldErrType = {
  [field: string]: string;
};

const useUser = () => {
  const {
    addDocument,
    updateDocument,
    allData,
    getDocuments: getUsers,
    currentPage,
    deleteDocument: deleteUser,
    getDocumentById: getUserById,
    goToPage,
    loading,
    setFilters,
    setPageSize,
    totalPages,
  } = useFirestore(DATATABLES.USERS);

  const [fieldsData, setFieldsData] = useState<
    CreateUserType | UpdateUserType | null
  >(null);

  const [fieldErrs, setFieldErrs] = useState<FieldErrType>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setFieldsData({
      ...fieldsData,
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
    const fieldExists = await checkFieldExists(DATATABLES.USERS, {
      [name]: value,
    });
    if (fieldExists) {
      setFieldErrs({ ...fieldErrs, [name]: `${value} already exists` });
    } else {
      delete fieldErrs?.[name];

      setFieldErrs(fieldErrs);
    }
  };

  const addUser = async () => {
    if (!fieldsData) return;
    await addDocument({
      ...fieldsData,
      createdAt: new Date(),
    });
  };

  const updateUser = async (id: string, data: UpdateUserType) => {
    await updateDocument(id, data);
  };

  const fieldsForm: KRenderFieldProps[] = useMemo(() => {
    console.log({ fieldErrs }, "memo");

    return [
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
        onChange: handleOnChange,
        onBlur: checkField,
        value: fieldsData?.email || "",
        tabIndex: 0,
      },
      {
        type: "text",
        name: "firstName",
        label: "First Name",
        placeholder: "First Name",
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
        xs: 12,
        md: 6,
        xl: 6,
        onChange: handleOnChange,
        value: fieldsData?.lastName || "",
      },
    ];
  }, [fieldErrs, fieldsData]);

  return {
    addUser,
    updateUser,
    fieldsForm,
    goToPage,
    loading,
    setFilters,
    setPageSize,
    totalPages,
    deleteUser,
    getUserById,
    getUsers,
    allData,
    currentPage,
  };
};

export default useUser;
