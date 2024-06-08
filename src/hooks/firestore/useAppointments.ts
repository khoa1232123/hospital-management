import { DATATABLES } from "@/constants";
import { splitString } from "@/utils/strings";
import { useState } from "react";
import { useFirestore } from ".";
import useChange from "../common/useChange";
import { useFormAppointment } from "../form";
import { FilterType } from "@/types/firebaseHook";

const initialData: CreateAppointmentType = {
  email: "",
  departmentId: "",
  patientId: "",
  status: "pending",
  userId: "",
};

const useAppointments = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType,
  queryFilters?: FilterType
) => {
  const [data, setData] = useState<
    UpdateAppointmentType | CreateAppointmentType | null
  >(initialData);

  const {
    addDocument,
    updateDocument,
    getDocuments: getAppointments,
    deleteDocument: deleteAppointment,
    getDocumentById,
    setOpen,
    ...rest
  } = useFirestore(
    DATATABLES.APPOINTMENTS,
    initialPageSize,
    moreGetData,
    queryFilters
  );

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.APPOINTMENTS,
  });

  const closeForm = () => {
    setData(initialData);
    setOpen(false);
  };

  const getAppointmentById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitAppointment = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    if (data.id) {
      const newAppointment: UpdateAppointmentType = {
        ...(data as UpdateAppointmentType),
      };
      await updateDocument(data.id, newAppointment);
      closeForm();
    } else {
      const newAppointment: CreateAppointmentType = {
        ...(data as CreateAppointmentType),
      };
      await addDocument(newAppointment);
      closeForm();
    }
  };

  const editAppointment = (id: string) => {
    getAppointmentById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormAppointment({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    ...rest,
    fieldsForm,
    getAppointmentById,
    submitAppointment,
    setOpen,
    closeForm,
    data,
    editAppointment,
    deleteAppointment,
    getAppointments,
    setData,
  };
};

export default useAppointments;
