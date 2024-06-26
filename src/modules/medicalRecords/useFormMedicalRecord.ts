import { useMainContext } from "@/contexts";
import { FieldErrType, KInputType } from "@/types/field";
import React, { useMemo } from "react";
import { useMedications } from "../medications";

type Props = {
  fieldErrs?: FieldErrType;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  data: any | null;
  setData: (data: any) => void;
};

const useFormMedicalRecord = ({
  fieldErrs,
  onChange,
  onBlur,
  data,
  setData,
}: Props) => {
  const { dataPatients, dataUsers } = useMainContext();
  const { dataSelected: dataMedications } = useMedications(10, {
    dataSelected: true,
  });

  const clickPlusPresciption = () => {
    setData({
      ...data,
      prescriptions: [
        {
          medicationId: "",
          dosage: "",
        },
        ...(data?.prescriptions || []),
      ],
    });
  };

  const fieldsForm: KInputType[] = useMemo(() => {
    let fields = [
      {
        type: "select",
        name: "userId",
        label: "Doctor",
        placeholder: "Doctor",
        select: true,
        xs: 6,
        md: 6,
        options: [...dataUsers],
      },
      {
        type: "select",
        name: "patientId",
        label: "Patient",
        placeholder: "Patient",
        select: true,
        xs: 6,
        md: 6,
        options: [...dataPatients],
      },
      {
        type: "datetime-local",
        name: "visitDate",
        label: "Visit Date",
        placeholder: "Visit Date",
        xs: 12,
        md: 6,
        xl: 6,
        focused: true,
      },
      {
        type: "datetime-local",
        name: "followUpDate",
        label: "Follow Up Date",
        placeholder: "Follow Up Date",
        xs: 12,
        md: 6,
        xl: 6,
        focused: true,
      },
      {
        type: "text",
        name: "symptoms",
        label: "Symptoms",
        placeholder: "Symptoms",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "text",
        name: "diagnosis",
        label: "Diagnosis",
        placeholder: "Diagnosis",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "textarea",
        name: "treatment",
        label: "Treatment",
        placeholder: "Treatment",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
      {
        type: "array",
        name: "",
        label: "Medicial",
        onClick: clickPlusPresciption,
        array: (data?.prescriptions || []).map(
          (prescription: any, index: number) => ({
            type: "arrayItems",
            name: `prescriptions[${index}]`,
            items: [
              {
                type: "select",
                name: `prescriptions[${index}].medicationId`,
                label: "Medication",
                placeholder: "Medication",
                select: true,
                xs: 4,
                md: 4,
                xl: 4,
                options: [...dataMedications],
                value: prescription.medicationId || "",
              },
              {
                type: "text",
                name: `prescriptions[${index}].dosage`,
                label: "Dosage",
                placeholder: "Dosage",
                xs: 3,
                md: 3,
                xl: 3,
                value: prescription.dosage || "",
              },
            ],
          })
        ),
      },
      {
        type: "text",
        name: "symptoms2",
        label: "Symptoms",
        placeholder: "Symptoms",
        multiline: true,
        rows: 3,
        xs: 12,
        md: 12,
        xl: 12,
      },
    ];

    return fields.map((field) => {
      if (field.type === "array") {
        const array = field.array?.map((value: any) => {
          const items = value.items.map((item: any) => {
            return {
              ...item,
              onChange,
            };
          });
          return {
            ...value,
            items: items,
          };
        });

        return {
          ...field,
          array: array,
        };
      } else {
        return {
          ...field,
          value: data?.[field?.name] || "",
          onChange,
        };
      }
    });
  }, [fieldErrs, data, dataUsers, dataPatients]);

  return { fieldsForm };
};

export default useFormMedicalRecord;
