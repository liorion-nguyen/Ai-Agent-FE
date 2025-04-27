export interface Resource {
  id: string;
  user_id: string;
  external_icon_url: string;
  external_resource_id: string;
  external_type: string;
  external_type_name: string;
  name: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  source_file_id: string;
  source_type: string;
  external_document_id: string;
  format_type: string;
  document_name: string;
  caption: string;
  web_url: string;
  type: string;
  icon_url: string;
  created_at?: string;
  updated_at?: string;
}
