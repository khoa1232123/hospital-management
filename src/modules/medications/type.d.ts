type MedicationType = {
  id?: string; //	INT	Khóa chính
  name?: string; //	VARCHAR(100)	Tên thuốc
  nameSearch?: string[];
  description?: string; //	TEXT	Mô tả
  sideEffects?: string; //	TEXT	Tác dụng phụ
  dosage?: string; // Liều dùng
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateMedicationType = MedicationType & {
  name: string;
};

type UpdateMedicationType = MedicationType & {
  id: string;
};

type GetMedicationType = MedicationType & {
  id: string;
};

type DeleteMedicationType = {
  id: string;
};
