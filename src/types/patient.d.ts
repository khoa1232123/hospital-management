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

type VisitType = {
  id?: string;
  patientId?: string; // INT	Mã bệnh nhân
  userId?: string; // mã bác sĩ
  visitDate?: Date; // DATETIME	Ngày và giờ khám
  purpose?: string; //VARCHAR(255)	Mục đích khám
  notes?: string; // TEXT Ghi chú
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateVisitType = VisitType & {
  patientId: string;
  userId: string;
};

type UpdateVisitType = VisitType & {
  id: string;
};

type GetVisitType = VisitType & {
  id: string;
};

type DeleteVisitType = {
  id: string;
};
