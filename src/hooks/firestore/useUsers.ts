import { DATATABLES } from "@/constants";
import { useState } from "react";
import { useFirestore } from ".";
import useChange from "../common/useChange";
import useFormUser from "../form/useFormUser";

const useUser = (initialPageSize: number = 10, isData: boolean = false) => {
  const [data, setData] = useState<UpdateUserType | CreateUserType | null>(
    null
  );

  const {
    addDocument,
    updateDocument,
    getDocuments: getUsers,
    deleteDocument: deleteUser,
    getDocumentById,
    allData,
    setOpen,
    ...rest
  } = useFirestore(DATATABLES.USERS, initialPageSize, isData);

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.USERS,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
  };

  const getUserById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const addUser = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const newUser: CreateUserType = {
      ...(data as CreateUserType),
      fullName: data.firstName + " " + data.lastName,
      fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
    };
    const result = await addDocument(newUser);
    closeForm();
    return result;
  };

  const updateUser = async (id: string) => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const newUser: UpdateUserType = {
      ...(data as UpdateUserType),
      fullName: data.firstName + " " + data.lastName,
      fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
    };
    const result = await updateDocument(id, newUser);
    closeForm();
    return result;
  };

  const submitUser = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    if (data.id) {
      const newUser: UpdateUserType = {
        ...(data as UpdateUserType),
        fullName: data.firstName + " " + data.lastName,
        fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
      };
      await updateDocument(data.id, newUser);
      closeForm();
    } else {
      const newUser: CreateUserType = {
        ...(data as CreateUserType),
        fullName: data.firstName + " " + data.lastName,
        fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
      };
      await addDocument(newUser);
      closeForm();
    }
  };

  const { fieldsForm } = useFormUser({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    addUser,
    updateUser,
    fieldsForm,
    deleteUser,
    getUserById,
    getUsers,
    allData,
    closeForm,
    setOpen,
    data,
    submitUser,
    ...rest,
  };
};

export default useUser;
