type EquipmentType = {
  id?: string;
  name?: string; //	VARCHAR(100)	Tên thiết bị
  nameSearch?: string[];
  description?: string; //	TEXT	Mô tả
  departmentId?: string; //	INT	Mã khoa/phòng
  purchaseDate?: Date; //	DATE	Ngày mua
  maintenanceDate?: Date; //	DATE	Ngày bảo trì
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateEquipmentType = EquipmentType & { name: string };

type UpdateEquipmentType = EquipmentType & { id: string };

type GetEquipmentType = EquipmentType & { id: string };

type DeleteEquipmentType = { id: string };
