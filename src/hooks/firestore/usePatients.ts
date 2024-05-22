import React, { useState } from "react";
import { useFirestore } from ".";
import { DATATABLES } from "@/constants";
import useChange from "../common/useChange";
import useFormPatient from "../form/useFormPatient";

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

  const addPatient = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const newPatient: CreatePatientType = {
      ...(data as CreatePatientType),
      fullName: data.firstName + " " + data.lastName,
      fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
    };
    const result = await addDocument(newPatient);
    closeForm();
    return result;
  };

  const updatePatient = async (id: string) => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const newPatient: UpdatePatientType = {
      ...(data as UpdatePatientType),
      fullName: data.firstName + " " + data.lastName,
      fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
    };
    const result = await updateDocument(id, newPatient);
    closeForm();
    return result;
  };

  const submitPatient = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    if (data.id) {
      const newPatient: UpdatePatientType = {
        ...(data as UpdatePatientType),
        fullName: data.firstName + " " + data.lastName,
        fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
      };
      await updateDocument(data.id, newPatient);
      closeForm();
    } else {
      const newPatient: CreatePatientType = {
        ...(data as CreatePatientType),
        fullName: data.firstName + " " + data.lastName,
        fullNameSearch: (data.firstName + " " + data.lastName).toLowerCase(),
      };
      await addDocument(newPatient);
      closeForm();
    }
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
    addPatient,
    submitPatient,
    updatePatient,
    setOpen,
    closeForm,
    allData,
    deletePatient,
  };
};

export default usePatients;
