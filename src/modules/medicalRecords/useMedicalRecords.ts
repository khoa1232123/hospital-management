import { DATATABLES } from "@/constants";
import useChange from "@/hooks/common/useChange";
import { useFirestore } from "@/hooks/firestore";
import { FilterType } from "@/types/firebaseHook";
import { useState } from "react";
import useFormMedicalRecord from "./useFormMedicalRecord";

const initialValue: CreateMedicalRecordType = {
  appointmentId: "",
  diagnosis: "",
  patientId: "",
  symptoms: "",
  treatment: "",
  userId: "",
  prescriptions: [
    {
      medicationId: "",
      dosage: "",
      notes: "",
    },
  ],
};

const useMedicalRecords = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<
    UpdateMedicalRecordType | CreateMedicalRecordType | null
  >(initialValue);
  const {
    addDocument,
    updateDocument,
    getDocuments: getMedicalRecords,
    deleteDocument: deleteMedicalRecord,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore<MedicationType>(
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
    setData(initialValue);
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
      await updateDocument(data.id, newMedicalRecord);
      closeForm();
    } else {
      const newMedicalRecord: CreateMedicalRecordType = {
        ...(data as CreateMedicalRecordType),
      };

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
    setData,
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
