import { DATATABLES } from "@/constants";
import { useEffect, useState } from "react";
import { FilterType } from "@/types/firebaseHook";
import { useParams } from "next/navigation";
import { useFirestore } from "@/hooks/firestore";
import useChange from "@/hooks/common/useChange";
import { useFormBedAssignment } from ".";
import { useRooms } from "../rooms";

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
  const { id: roomId } = useParams();

  const {
    addDocument,
    updateDocument,
    getDocuments: getBedAssignments,
    deleteDocument: deleteBedAssignment,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore(
    DATATABLES.ROOMS + `/${roomId}/` + DATATABLES.BEDASSIGNMENTS,
    initialPageSize,
    moreGetData,
    queryFilters
  );

  const { getRoomById, data: dataRoom } = useRooms();

  useEffect(() => {
    if (roomId) {
      getRoomById(roomId as string);
    }
  }, [roomId]);

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName:
      DATATABLES.ROOMS + `/${roomId}/` + DATATABLES.BEDASSIGNMENTS,
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
    numberOfBed: Number(dataRoom?.numberOfBed),
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
