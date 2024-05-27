import { DATATABLES } from "@/constants";
import { useEffect, useState } from "react";
import { useDepartments, useFirestore } from ".";
import useChange from "../common/useChange";
import { splitString } from "@/utils/strings";
import { useFormUser } from "../form";

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
    setAllData,
    ...rest
  } = useFirestore(DATATABLES.USERS, initialPageSize, isData);

  const { getDataSelected } = useDepartments();

  useEffect(() => {
    const unSub = async () => {
      const data = await getDataSelected();
      if (allData.length > 0 && data.length > 0) {
        const newAllData = allData.map((item) => {
          const index = data.findIndex(
            (itemData) => itemData.value === item.departmentId
          );

          console.log({ data });

          if (index !== -1) {
            return { ...item, departmentName: data[index]?.label };
          } else {
            return item;
          }
        });
        setAllData(newAllData);
      }
    };

    unSub();
  }, [allData.length]);

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
    allData,
    closeForm,
    setOpen,
    data,
    submitUser,
    editUser,
    ...rest,
  };
};

export default useUser;
