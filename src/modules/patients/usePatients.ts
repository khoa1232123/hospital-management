import React, { useState } from "react";
import { DATATABLES } from "@/constants";
import { splitString } from "@/utils/strings";
import { useFirestore } from "@/hooks/firestore";
import useChange from "@/hooks/common/useChange";
import useFormPatient from "./useFormPatient";

const usePatients = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType
) => {
  const [data, setData] = useState<
    UpdatePatientType | CreatePatientType | null
  >(null);

  const {
    addDocument,
    updateDocument,
    getDocuments: getPatients,
    deleteDocument: deletePatient,
    getDocumentById,
    allData,
    setOpen,
    ...rest
  } = useFirestore<GetPatientType>(
    DATATABLES.PATIENTS,
    initialPageSize,
    moreGetData
  );

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.PATIENTS,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
  };

  const getPatientById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitPatient = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const fullName = (data.firstName + " " + data.lastName).trim();
    if (data.id) {
      const newPatient: UpdatePatientType = {
        ...(data as UpdatePatientType),
        fullName: fullName,
        nameSearch: splitString(fullName.toLowerCase()),
      };
      await updateDocument(data.id, newPatient);
      closeForm();
    } else {
      const newPatient: UpdatePatientType = {
        ...(data as CreatePatientType),
        id: data.id || "",
        fullName: fullName,
        nameSearch: splitString(fullName.toLowerCase()),
      };
      await addDocument(newPatient);
      closeForm();
    }
  };

  const editPatient = (id: string) => {
    getPatientById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormPatient({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    ...rest,
    fieldsForm,
    getPatients,
    getPatientById,
    submitPatient,
    setOpen,
    closeForm,
    allData,
    editPatient,
    deletePatient,
    updatePatient: updateDocument,
  };
};

export default usePatients;
