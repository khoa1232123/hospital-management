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
