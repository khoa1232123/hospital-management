import { DATATABLES } from "@/constants";
import { splitString } from "@/utils/strings";
import { useState } from "react";
import { useFirestore } from ".";
import useChange from "../common/useChange";
import { useFormDepartment } from "../form";

const useDepartments = (
  initialPageSize: number = 10,
  isData: boolean = false
) => {
  const [data, setData] = useState<
    UpdateDepartmentType | CreateDepartmentType | null
  >(null);

  const {
    addDocument,
    updateDocument,
    getDocuments: getDepartments,
    deleteDocument: deleteDepartment,
    getDocumentById,
    allData,
    setOpen,
    ...rest
  } = useFirestore(DATATABLES.DEPARTMENTS, initialPageSize, isData);

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.DEPARTMENTS,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
  };

  const getDepartmentById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitDepartment = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const fullName = (data.name + "").trim();
    if (data.id) {
      const newDepartment: UpdateDepartmentType = {
        ...(data as UpdateDepartmentType),
        nameSearch: splitString(fullName.toLowerCase()),
      };
      await updateDocument(data.id, newDepartment);
      closeForm();
    } else {
      const newDepartment: CreateDepartmentType = {
        ...(data as CreateDepartmentType),
        nameSearch: splitString(fullName.toLowerCase()),
      };
      await addDocument(newDepartment);
      closeForm();
    }
  };

  const editDepartment = (id: string) => {
    getDepartmentById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormDepartment({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    ...rest,
    fieldsForm,
    getDepartmentById,
    submitDepartment,
    setOpen,
    closeForm,
    allData,
    data,
    editDepartment,
    deleteDepartment,
  };
};

export default useDepartments;
