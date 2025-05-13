export interface PaymentList {
  id: string | number;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string | null;
}

export interface Payment {
  id: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}
