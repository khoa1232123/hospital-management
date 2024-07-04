type prescriptionType = {
  medicationId: string;
  dosage: string;
  notes?: string;
};

type MedicalRecordType = {
  id?: string;
  patientId?: string;
  userId?: string;
  appointmentId?: string;
  visitDate?: Date; //Ngày và giờ khám
  symptoms?: string; //Triệu chứng
  diagnosis?: string; //Chẩn đoán
  treatment?: string; //Điều trị
  followUpDate?: Date; //Ngày hẹn tái khám
  prescriptions?: prescriptionType[];
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateMedicalRecordType = MedicalRecordType & {
  patientId?: string;
  userId?: string;
};

type UpdateMedicalRecordType = MedicalRecordType & {
  id: string;
};

type GetMedicalRecordType = MedicalRecordType & {
  id: string;
};

type DeleteMedicalRecordType = {
  id: string;
};
