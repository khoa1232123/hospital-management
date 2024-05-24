type PatientType = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  fullNameSearch?: string;
  nameSearch?: string[];
  birthday?: Date;
  gender?: "male" | "female" | "other";
  phone?: string;
  address?: string;
  avatar?: string;
  emergencyContact?: string; //Liên hệ khẩn cấp
  insuranceNumber?: string; //Số bảo hiểm
  medicalHistory?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreatePatientType = PatientType & {
  email: string;
  phone: string;
};

type UpdatePatientType = PatientType & {
  id: string;
};

type GetPatientType = PatientType & {
  id: string;
};

type DeletePatientType = {
  id: string;
};
