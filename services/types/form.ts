import { Form } from '@/shared/types/form';

export interface GetFormsResponse {
  success: boolean;
  message: string;
  data: Form[];
  totalCount: number;
  totalPages?: number;
}

export interface GetFormsParams {
  workspace_id: string;
  user_id: string;
}
