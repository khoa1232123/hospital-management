import { DATATABLES } from "@/constants";
import { useState } from "react";
import { useFirestore } from ".";
import useChange from "../common/useChange";
import { useFormBedAssignment } from "../form";
import { FilterType } from "@/types/firebaseHook";

const initialValue: CreateBedAssignmentType = {
  roomId: "",
};

const useBedAssignments = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<
    UpdateBedAssignmentType | CreateBedAssignmentType | null
  >(initialValue);
  const {
    addDocument,
    updateDocument,
    getDocuments: getBedAssignments,
    deleteDocument: deleteBedAssignment,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore(
    DATATABLES.BEDASSIGNMENTS,
    initialPageSize,
    moreGetData,
    queryFilters
  );

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.BEDASSIGNMENTS,
  });

  const closeForm = () => {
    setData(initialValue);
    setOpen(false);
  };

  const getBedAssignmentById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitBedAssignment = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;

    if (data.id) {
      const newBedAssignment: UpdateBedAssignmentType = {
        ...(data as UpdateBedAssignmentType),
      };
      await updateDocument(data.id, newBedAssignment);
      closeForm();
    } else {
      const newBedAssignment: CreateBedAssignmentType = {
        ...(data as CreateBedAssignmentType),
      };

      await addDocument(newBedAssignment);
      closeForm();
    }
  };

  const editBedAssignment = (id: string) => {
    getBedAssignmentById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormBedAssignment({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
    setData,
  });

  return {
    fieldsForm,
    deleteBedAssignment,
    getBedAssignmentById,
    getBedAssignments,
    closeForm,
    setOpen,
    submitBedAssignment,
    editBedAssignment,
    setData,
    ...rest,
  };
};

export default useBedAssignments;
