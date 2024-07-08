type VisitType = {
  id?: string;
  patientId?: string;
  userId?: string;
  visitDate?: Date;
  purpose?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateVisitType = VisitType & {
  email: string;
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
