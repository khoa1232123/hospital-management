import { DATATABLES } from "@/constants";
import { splitString } from "@/utils/strings";
import { useRef, useState } from "react";
import { FilterType } from "@/types/firebaseHook";
import { useFirestore } from "@/hooks/firestore";
import useChange from "@/hooks/common/useChange";
import useFormUser from "./useFormUser";

const useUsers = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<UpdateUserType | CreateUserType | null>(
    null
  );
  const prevDataRef = useRef<UpdateUserType | CreateUserType | null>(null);
  const {
    addDocument,
    updateDocument,
    getDocuments: getUsers,
    deleteDocument: deleteUser,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore<UserType>(
    DATATABLES.USERS,
    initialPageSize,
    moreGetData,
    queryFilters,
  );

  const { onChange, checkField, fieldErrs, checkRequiredFields, setFieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.USERS,
    ref: prevDataRef,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
    setFieldErrs({});
  };

  const getUserById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
    prevDataRef.current = result;
  };

  const submitUser = async () => {
    const requiredFields = checkRequiredFields(fieldsForm);
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const fullName = (data.firstName + " " + data.lastName).trim();

    if (requiredFields) return;
    if (data.id) {
      const newUser: UpdateUserType = {
        ...(data as UpdateUserType),
        fullName: fullName,
        nameSearch: splitString(fullName.toLowerCase()),
      };
      await updateDocument(data.id, newUser);
      closeForm();
    } else {
      const newUser: CreateUserType = {
        ...(data as CreateUserType),
        fullName: fullName,
        nameSearch: splitString(fullName.toLowerCase()),
      };

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
