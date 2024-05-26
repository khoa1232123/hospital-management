type UserType = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  nameSearch?: string[];
  birthday?: Date;
  gender?: "male" | "female" | "other";
  phone?: string;
  address?: string;
  avatar?: string;
  position?: string;
  role?: "admin" | "user";
  dateHired?: Date;
  salary?: number;
  shift?: string;
  departmentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateUserType = UserType & {
  email: string;
};

type UpdateUserType = UserType & {
  id: string;
};

type GetUserType = UserType & {
  id: string;
};

type DeleteUserType = {
  id: string;
};
