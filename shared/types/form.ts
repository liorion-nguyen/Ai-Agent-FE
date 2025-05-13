export interface FormList {
  id: string | number;
  name: string;
  type: string;
  status: string;
  created_at: string | null;
}

export interface Form {
  id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
}
