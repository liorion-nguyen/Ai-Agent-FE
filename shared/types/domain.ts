export interface DomainList {
  id: string | number;
  domain: string;
  status: string;
  created_at: string | null;
  description: string;
}

export interface Domain {
  domain: string;
  status: string;
  created_at: string;
  description: string;
}
