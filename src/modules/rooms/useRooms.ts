import React, { useState } from "react";
import { DATATABLES } from "@/constants";
import { splitString } from "@/utils/strings";
import { useFirestore } from "@/hooks/firestore";
import useChange from "@/hooks/common/useChange";
import { useFormRoom } from ".";

const useRooms = (
  initialPageSize: number = 10,
  moreGetData?: MoreGetDataType
) => {
  const [data, setData] = useState<UpdateRoomType | CreateRoomType | null>(
    null
  );

  const {
    addDocument,
    updateDocument,
    getDocuments: getRooms,
    deleteDocument: deleteRoom,
    getDocumentById,
    allData,
    setOpen,
    ...rest
  } = useFirestore<RoomType>(DATATABLES.ROOMS, initialPageSize, moreGetData);

  const { onChange, checkField, fieldErrs } = useChange({
    setData,
    data,
    collectionName: DATATABLES.ROOMS,
  });

  const closeForm = () => {
    setData(null);
    setOpen(false);
  };

  const getRoomById = async (id: string) => {
    const result: any = await getDocumentById(id);
    setData(result);
  };

  const submitRoom = async () => {
    if (!data) return;
    if (JSON.stringify(fieldErrs).length > 2) return;
    const fullName = (data?.name || "").trim();
    if (data.id) {
      const newRoom: UpdateRoomType = {
        ...(data as UpdateRoomType),
        nameSearch: splitString(fullName.toLowerCase()),
      };
      await updateDocument(data.id, newRoom);
      closeForm();
    } else {
      const newRoom: CreateRoomType = {
        ...(data as CreateRoomType),
        nameSearch: splitString(fullName.toLowerCase()),
      };
      await addDocument(newRoom);
      closeForm();
    }
  };

  const editRoom = (id: string) => {
    getRoomById(id);
    setOpen(true);
  };

  const { fieldsForm } = useFormRoom({
    fieldErrs,
    onChange: onChange,
    onBlur: checkField,
    data,
  });

  return {
    ...rest,
    fieldsForm,
    getRooms,
    getRoomById,
    submitRoom,
    setOpen,
    closeForm,
    allData,
    editRoom,
    deleteRoom,
  };
};

export default useRooms;
