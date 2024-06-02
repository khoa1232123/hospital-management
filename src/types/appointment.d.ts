type AppointmentType = {
  id?: string;
  patientId?: string;
  userId?: string;
  departmentId?: string;
  appointmentDate?: Date;
  status?: "pending" | "done" | "cancel";
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateAppointmentType = AppointmentType & {
  email: string;
};

type UpdateAppointmentType = AppointmentType & {
  id: string;
};

type GetAppointmentType = AppointmentType & {
  id: string;
};

type DeleteAppointmentType = {
  id: string;
};
