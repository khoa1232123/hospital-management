import { DATATABLES } from "@/constants";
import useChange from "@/hooks/common/useChange";
import { useFirestore } from "@/hooks/firestore";
import { FilterType } from "@/types/firebaseHook";
import { useRef, useState } from "react";
import { useFormVisit } from ".";

const useVisits = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<UpdateVisitType | CreateVisitType | null>(
    null
  );
  const prevDataRef = useRef<UpdateVisitType | CreateVisitType | null>(null);
  const {
    addDocument,
    updateDocument,
    getDocuments: getVisits,
    deleteDocument: deleteVisit,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore<VisitType>(
    DATATABLES.VISITS,
    initialPageSize,
    moreGetData,
    queryFilters,
  );

  const { onChange, checkField, fieldErrs, checkRequiredFields, setFieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.VISITS,
    ref: prevDataRef,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
    setFieldErrs({});
  };

  const getVisitById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
    prevDataRef.current = result;
  };

  const submitVisit = async () => {
    const requiredFields = checkRequiredFields(fieldsForm);
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;

    if (requiredFields) return;
    if (data.id) {
      const newVisit: UpdateVisitType = {
        ...(data as UpdateVisitType),
      };
      await updateDocument(data.id, newVisit);
      closeForm();
    } else {
      const newVisit: CreateVisitType = {
        ...(data as CreateVisitType),
      };

      await addDocument(newVisit);
      closeForm();
    }
  };

  const editVisit = (id: string) => {
    getVisitById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormVisit({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    fieldsForm,
    deleteVisit,
    getVisitById,
    getVisits,
    closeForm,
    setOpen,
    submitVisit,
    editVisit,
    setData,
    ...rest,
  };
};

export default useVisits;
