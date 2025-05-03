import { ChatbotPrompt } from '@/shared/types/chatbot';
import { Document, Resource } from '@/shared/types/resource';

export interface CreateResourceParams {
  user_id?: string;
  api_token?: string;
  resource_name: string;
  external_space_id?: string;
  external_type_name?: string;
  description?: string;
}

export interface CreateResourceResponse {
  created_at: string;
  external_resource_id: string;
  external_type: string;
  external_type_name: string;
  id: string;
  message: string;
  name: string;
  status: string;
  success: boolean;
  updated_at: string;
  user_id: string;
}

export interface UploadFileKnowledgeParams {
  user_id: string;
  resource_id: string;
  api_token: string;
  format_type: string;
  filebase_64: string;
  name_document: string;
  file_type: string;
}

export interface EncodeFileParams {
  user_id?: string;
  file: FormData;
}

export interface EncodeFileResponse {
  base64: string;
  filename: string;
  mimetype: string;
  dataUrl: string;
}
export interface UploadFileKnowledgeResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
}
export interface GetAllResourcesResponse {
  success: boolean;
  message: string;
  resources: {
    id: string;
    resources: Resource[];
    prompts: ChatbotPrompt[];
  };
}

export interface GetResourceResponse {
  success: boolean;
  message: string;
  resource: {
    id: string;
    user_id: string;
    external_icon_url: string;
    external_resource_id: string;
    external_type: string;
    external_type_name: string;
    name: string;
    description: string;
    status: string;
    documents: Document[];
  };
}

export interface AddResourceToChatbotParams {
  chatbot_id?: string;
  user_id?: string;
  api_token?: string;
  dataset_ids: string[];
  auto_call?: boolean;
  search_strategy?: number;
}
export interface AddResourceToChatbotResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
}
