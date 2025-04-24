export interface Model {
  id: string;
  model_name: string;
  context_length?: number;
  created_at?: string;
  description?: string;
  features?: string;
  provider?: string;
  status?: string;
  type?: string;
  updated_at?: string;
  icon?: string;
  icon_url?: string;
}
