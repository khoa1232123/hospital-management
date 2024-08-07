import { DATATABLES } from "@/constants";
import { useEffect, useState } from "react";
import { FilterType } from "@/types/firebaseHook";
import { useParams } from "next/navigation";
import { useFirestore } from "@/hooks/firestore";
import useChange from "@/hooks/common/useChange";
import { useFormBedAssignment } from ".";
import { serverTimestamp } from "firebase/firestore";
import { usePatients } from "@/modules/patients";
import { useRooms } from "..";

const initialValue: CreateBedAssignmentType = {
  roomId: "",
  patientId: "",
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
  } = useFirestore<BedAssignmentType>(
    DATATABLES.ROOMS + `/${roomId}/` + DATATABLES.BEDASSIGNMENTS,
    initialPageSize,
    moreGetData,
    queryFilters
  );

  const { updatePatient } = usePatients();

  const { getRoomById, data: dataRoom } = useRooms();

  useEffect(() => {
    if (roomId) {
      getRoomById(roomId as string);
    }
  }, [roomId]);

  const { onChange, checkField, fieldErrs, checkRequiredFields, setFieldErrs } =
    useChange({
      setData,
      data,
      collectionName:
        DATATABLES.ROOMS + `/${roomId}/` + DATATABLES.BEDASSIGNMENTS,
    });

  const { fieldsForm } = useFormBedAssignment({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
    setData,
    numberOfBed: Number(dataRoom?.numberOfBed),
  });

  const closeForm = () => {
    setData(initialValue);
    setOpen(false);
    setFieldErrs({});
  };

  const getBedAssignmentById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitBedAssignment = async () => {
    const requiredFields = checkRequiredFields(fieldsForm);
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;

    if (requiredFields) return;

    if (data.id) {
      const newBedAssignment: UpdateBedAssignmentType = {
        ...(data as UpdateBedAssignmentType),
      };
      await updateDocument(data.id, newBedAssignment);

      if (data.patientId) {
        await updatePatient(data.patientId, {
          room: {
            id: roomId as string,
            bedNumber: newBedAssignment.bedNumber,
            updatedAt: serverTimestamp(),
          },
        });
      }
      closeForm();
    } else {
      const newBedAssignment: CreateBedAssignmentType = {
        ...(data as CreateBedAssignmentType),
      };

      await addDocument(newBedAssignment);

      if (data.patientId) {
        await updatePatient(data.patientId, {
          room: {
            id: roomId as string,
            bedNumber: newBedAssignment.bedNumber,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
        });
      }
      closeForm();
    }
  };

  const editBedAssignment = (id: string) => {
    getBedAssignmentById(id);
    setOpen(true);
  };

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
