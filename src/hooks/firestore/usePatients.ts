import React, { useState } from "react";
import { useFirestore } from ".";
import { DATATABLES } from "@/constants";
import useChange from "../common/useChange";
import { splitString } from "@/utils/strings";
import { useFormPatient } from "../form";

const usePatients = (initialPageSize: number = 10, isData: boolean = false) => {
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
  } = useFirestore(DATATABLES.PATIENTS, initialPageSize, isData);

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
      const newPatient: CreatePatientType = {
        ...(data as CreatePatientType),
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
    getPatientById,
    submitPatient,
    setOpen,
    closeForm,
    allData,
    editPatient,
    deletePatient,
  };
};

export default usePatients;
