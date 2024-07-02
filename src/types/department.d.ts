type DepartmentType = {
  id?: string;
  name?: string;
  nameSearch?: string[];
  location?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateDepartmentType = DepartmentType & {
  name: string;
};

type UpdateDepartmentType = DepartmentType & {
  id: string;
};

type GetDepartmentType = DepartmentType & {
  id: string;
};

type DeleteDepartmentType = {
  id: string;
};

type RoomType = {
  id?: string;
  name?: string; //	VARCHAR(10)	Số phòng
  nameSearch?: string[];
  departmentId?: string; //	INT	Mã khoa/phòng
  type?: string; //	VARCHAR(50)	Loại phòng (phòng thường, phòng VIP)
  numberOfBed?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateRoomType = RoomType & {
  name: string;
};

type UpdateRoomType = RoomType & {
  id: string;
};

type GetRoomType = RoomType & {
  id: string;
};

type DeleteRoomType = {
  id: string;
};

type BedAssignmentType = {
  id?: string;
  bedNumber?: string;
  roomId?: string; //	INT	Mã phòng
  patientId?: string; //	INT	Mã bệnh nhân
  admissionDate?: Date; //	DATE	Ngày nhập viện
  dischargeDate?: Date; //	DATE	Ngày xuất viện
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateBedAssignmentType = BedAssignmentType & {
  roomId?: string;
  patientId: string;
};

type UpdateBedAssignmentType = BedAssignmentType & {
  id: string;
  roomId: string;
  patientId: string;
};

type GetBedAssignmentType = BedAssignmentType & {
  id: string;
};

type DeleteBedAssignmentType = {
  id: string;
};
