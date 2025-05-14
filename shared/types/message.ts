export interface MessageType {
  id: string;
  content: string;
  sender: string;
  sent_at: string;
}

export interface DialogBoxType {
  conversation_id: string;
  external_conversation_id: string;
  chatbot_name: string;
  started_at: string;
  status: string;
}
