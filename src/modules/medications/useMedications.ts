import { DATATABLES } from "@/constants";
import { useState } from "react";
import { FilterType } from "@/types/firebaseHook";
import { useFirestore } from "@/hooks/firestore";
import useChange from "@/hooks/common/useChange";
import { useFormMedication } from ".";

const useMedications = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<
    UpdateMedicationType | CreateMedicationType | null
  >(null);
  const {
    addDocument,
    updateDocument,
    getDocuments: getMedications,
    deleteDocument: deleteMedication,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore<MedicationType>(
    DATATABLES.MEDICATIONS,
    initialPageSize,
    moreGetData,
    queryFilters
  );

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.MEDICATIONS,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
  };

  const getMedicationById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitMedication = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;

    if (data.id) {
      const newMedication: UpdateMedicationType = {
        ...(data as UpdateMedicationType),
      };
      await updateDocument(data.id, newMedication);
      closeForm();
    } else {
      const newMedication: CreateMedicationType = {
        ...(data as CreateMedicationType),
      };

      await addDocument(newMedication);
      closeForm();
    }
  };

  const editMedication = (id: string) => {
    getMedicationById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormMedication({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  // 8681000
  return {
    fieldsForm,
    deleteMedication,
    getMedicationById,
    getMedications,
    closeForm,
    setOpen,
    submitMedication,
    editMedication,
    setData,
    ...rest,
  };
};

export default useMedications;
