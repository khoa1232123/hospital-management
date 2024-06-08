type BillType = {
  id?: string; //	INT	Khóa chính
  patientId?: string; //	INT	Mã bệnh nhân
  dateIssued?: Date; //	DATE	Ngày lập hóa đơn
  totalAmount?: number; //	DECIMAL(10,2)	Tổng số tiền
  status?: string; //	VARCHAR(20)	Trạng thái thanh toán
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateBillType = BillType & {
  patientId: string;
};

type UpdateBillType = BillType & { id: string };

type GetBillType = BillType & { id: string };

type DeleteBillType = { id: string };

type PaymentType = {
  id?: string; //	INT	Khóa chính
  billId?: string; //	INT	Mã hóa đơn
  paymentDate?: Date; //	DATE	Ngày thanh toán
  amountPaid?: number; //	DECIMAL(10,2)	Số tiền thanh toán
  paymentMethod?: string; //	VARCHAR(20)	Phương thức thanh toán
  createdAt?: Date;
  updatedAt?: Date;
};

type CreatePaymentType = PaymentType & { billId: string };

type UpdatePaymentType = PaymentType & { id: string };

type GetPaymentType = PaymentType & { id: string };

type DeletePaymentType = { id: string };
