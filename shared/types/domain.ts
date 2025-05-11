export interface DomainList {
  id: string | number;
  name: string;
  isVerified: boolean;
  verificationToken: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Domain {
  id: string;
  name: string;
  isVerified: boolean;
  verificationToken: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}
