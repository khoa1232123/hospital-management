import { DATATABLES } from "@/constants";
import { splitString } from "@/utils/strings";
import { useState } from "react";
import { useDepartments, useFirestore } from ".";
import useChange from "../common/useChange";
import { useFormUser } from "../form";
import { FilterType } from "@/types/firebaseHook";

const useUsers = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<UpdateUserType | CreateUserType | null>(
    null
  );
  const {
    addDocument,
    updateDocument,
    getDocuments: getUsers,
    deleteDocument: deleteUser,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore(
    DATATABLES.USERS,
    initialPageSize,
    moreGetData,
    queryFilters
  );

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

  const submitUser = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const fullName = (data.firstName + " " + data.lastName).trim();

    if (data.id) {
      const newUser: UpdateUserType = {
        ...(data as UpdateUserType),
        fullName: fullName,
        nameSearch: splitString(fullName.toLowerCase()),
      };
      console.log({ newUser });
      await updateDocument(data.id, newUser);
      closeForm();
    } else {
      const newUser: CreateUserType = {
        ...(data as CreateUserType),
        fullName: fullName,
        nameSearch: splitString(fullName.toLowerCase()),
      };

      console.log({ newUser });

      await addDocument(newUser);
      closeForm();
    }
  };

  const editUser = (id: string) => {
    getUserById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormUser({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    fieldsForm,
    deleteUser,
    getUserById,
    getUsers,
    closeForm,
    setOpen,
    submitUser,
    editUser,
    ...rest,
  };
};

export default useUsers;
