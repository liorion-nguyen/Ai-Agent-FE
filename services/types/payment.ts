import { Payment } from '@/shared/types/payment';

export interface GetPaymentsResponse {
  success: boolean;
  message: string;
  data: Payment[];
  totalCount: number;
  totalPages?: number;
}

export interface GetPaymentsParams {
  workspace_id: string;
  user_id: string;
}
