import { ChatbotPrompt } from '@/shared/types/chatbot';
import { Document, Resource } from '@/shared/types/resource';

export interface CreateResourceParams {
  user_id: string;
  api_token: string;
  resource_name: string;
  external_space_id: string;
  external_type_name: string;
  description: string;
}

export interface UploadFileKnowledgeParams {
  file: File;
  user_id: string;
  resource_id: string;
  api_token: string;
  format: string;
}

export interface GetAllResourcesResponse {
  success: boolean;
  message: string;
  data: {
    resources: {
      id: string;
      resources: Resource[];
      prompts: ChatbotPrompt[];
    };
  };
}

export interface GetResourceByIdResponse {
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
