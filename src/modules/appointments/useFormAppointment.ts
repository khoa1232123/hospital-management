import { dataStatus } from "@/constants";
import { useMainContext } from "@/contexts";
import { FieldErrType, KInputType } from "@/types/field";
import { rerenderForm } from "@/utils/array";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useUsers } from "../users";
import { usePatients } from "../patients";

type Props = {
  fieldErrs?: FieldErrType;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  data: any | null;
};

const useFormAppointment = ({ fieldErrs, onChange, onBlur, data }: Props) => {
  const { dataDepartments } = useMainContext();

  const {
    allData: dataPatients,
    onSearch: onSearchPatient,
    loading: isLoadingPatient,
    getPatientById
  } = usePatients(5, {
    dataSelected: true,
  });

  const {
    allData: dataUsers,
    onSearch: onSearchUser,
    loading: isLoadingUser,
    getUserById
  } = useUsers(5, {
    dataSelected: true,
  });
  

  const fieldsForm = useMemo<KInputType[]>(() => {
    let fields = [
      {
        type: "date",
        name: "appointmentDate",
        label: "Appointment Date",
        inputProps: { min: dayjs(Date.now()).format("YYYY-MM-DD") },
        xs: 12,
        md: 6,
        xl: 6,
        focused: true,
      },
      {
        type: "autoComplete",
        name: "userId",
        label: "User",
        select: true,
        xs: 12,
        md: 6,
        xl: 6,
        options: dataUsers,
        onSearch: onSearchUser,
        loading: isLoadingUser,
        getDataItem: getUserById,
      },
      {
        type: "autoComplete",
        name: "patientId",
        label: "Patient",
        select: true,
        xs: 12,
        md: 6,
        xl: 6,
        options: dataPatients,
        onSearch: onSearchPatient,
        loading: isLoadingPatient,
        getDataItem: getPatientById,
      },
      {
        type: "select",
        name: "departmentId",
        label: "Department",
        select: true,
        xs: 12,
        md: 6,
        xl: 6,
        options: dataDepartments,
      },
      {
        type: "select",
        name: "status",
        label: "Status",
        select: true,
        xs: 12,
        md: 6,
        options: dataStatus,
      },
    ] as KInputType[];

    return rerenderForm(fields, data, onChange);
  }, [fieldErrs, data, dataDepartments, dataUsers, dataPatients, dataStatus]);

  return { fieldsForm };
};

export default useFormAppointment;
