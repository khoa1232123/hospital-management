import { DATATABLES } from "@/constants";
import { useState } from "react";
import { useFirestore } from ".";
import useChange from "../common/useChange";
import useFormUser from "../form/useFormUser";
import { tableUsers } from "@/constants/renderTable";
import useTableComponents from "../useTableComponents";

const useUser = (initialPageSize: number = 10, isData: boolean = false) => {
  const [data, setData] = useState<CreateUserType | UpdateUserType | null>(
    null
  );

  const {
    addDocument,
    updateDocument,
    getDocuments: getUsers,
    deleteDocument: deleteUser,
    getDocumentById: getUserById,
    allData,
    ...rest
  } = useFirestore(DATATABLES.USERS, initialPageSize, isData);

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.USERS,
  });

  const addUser = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const newUser: CreateUserType = {
      ...(data as CreateUserType),
      fullName: data.firstName + " " + data.lastName,
      fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
    };
    const result = await addDocument(newUser);
    setData(null);
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
    setData(null);
    return result;
  };

  const { fieldsForm } = useFormUser({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  const { headerRow: headerData, rows: rowsData } = useTableComponents(
    allData,
    tableUsers
  );

  return {
    addUser,
    updateUser,
    fieldsForm,
    deleteUser,
    getUserById,
    getUsers,
    allData,
    headerData,
    rowsData,
    ...rest,
  };
};

export default useUser;
