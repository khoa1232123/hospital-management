import { DATATABLES } from "@/constants";
import { useState } from "react";
import { useFirestore } from ".";
import useChange from "../common/useChange";
import { useFormMedicalRecord } from "../form";
import { FilterType } from "@/types/firebaseHook";

const useMedicalRecords = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<
    UpdateMedicalRecordType | CreateMedicalRecordType | null
  >(null);
  const {
    addDocument,
    updateDocument,
    getDocuments: getMedicalRecords,
    deleteDocument: deleteMedicalRecord,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore(
    DATATABLES.MEDICALRECORDS,
    initialPageSize,
    moreGetData,
    queryFilters
  );

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.MEDICALRECORDS,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
  };

  const getMedicalRecordById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitMedicalRecord = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;

    if (data.id) {
      const newMedicalRecord: UpdateMedicalRecordType = {
        ...(data as UpdateMedicalRecordType),
      };
      console.log({ newMedicalRecord });
      await updateDocument(data.id, newMedicalRecord);
      closeForm();
    } else {
      const newMedicalRecord: CreateMedicalRecordType = {
        ...(data as CreateMedicalRecordType),
      };

      console.log({ newMedicalRecord });

      await addDocument(newMedicalRecord);
      closeForm();
    }
  };

  const editMedicalRecord = (id: string) => {
    getMedicalRecordById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormMedicalRecord({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    fieldsForm,
    deleteMedicalRecord,
    getMedicalRecordById,
    getMedicalRecords,
    closeForm,
    setOpen,
    submitMedicalRecord,
    editMedicalRecord,
    setData,
    ...rest,
  };
};

export default useMedicalRecords;
