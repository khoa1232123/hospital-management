type UserType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  fullNameSearch?: string;
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

type UpdateUserType = UserType & {};

type GetUserType = UserType & {
  id: string;
};

type DeleteUserType = {
  id: string;
};
