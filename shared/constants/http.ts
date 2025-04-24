export const API_ENDPOINTS = {
  // Authentication
  SIGNIN: '/auth/login',
  SIGNUP: '/auth/register',
  SIGNOUT: '/auth/logout',
  ME: '/users/profile',

  // User
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_OTP: '/auth/verify-otp',
  RESET_PASSWORD: '/auth/reset-password',
  UPDATE_PROFILE: '/users/profile',
  DELETE_USER: '/users/:id',
  API_TOKEN: '/users/profile/api-token',
  GET_ALL_USERS: '/users',
  GET_USER_BY_ID: '/users/:id',

  // Chatbots
  GET_ALL_CHATBOTS: '/users/profile/chatbots',
  GET_CHATBOT_BY_ID: '/users/profile/chatbots/:id',
  CREATE_CHATBOT: '/users/:user_id/chatbots',
  UPDATE_CHATBOT_CONFIG_BASIC:
    '/users/:user_id/chatbots/:chatbot_id/config-basic',
  UPDATE_CHATBOT_PROMPT: '/users/:user_id/chatbots/:chatbot_id/import-prompts',
  UPDATE_CHATBOT_DOCUMENTS:
    '/users/:user_id/chatbots/:chatbot_id/import-documents',
  PUBLISH_CHATBOT: '/users/:user_id/chatbots/:chatbot_id/publish',
  CREATE_ONBOARDING_CHATBOT: '/users/:user_id/chatbots/:chatbot_id/onboarding',
  UPDATE_ONBOARDING_CHATBOT:
    '/users/:user_id/chatbots/:chatbot_id/onboarding/:onboarding_id',
  CREATE_CHATBOT_PROMPT: '/users/:user_id/prompts',

  // Models
  GET_MODELS: '/chatbot-models',

  // Messages
  SEND_MESSAGE_REVIEW: '/users/:user_id/chatbots/:chatbot_id/chat',
  SEND_MESSAGE: '/users/:user_id/chatbots/:chatbot_id/iframe/chat',

  // Resources
  GET_ALL_RESOURCES: '/users/profile/resources',
  GET_RESOURCE_BY_ID: '/users/profile/resources/:id',
  CREATE_RESOURCE: '/users/:user_id/resources',
  CREATE_PROMPT: '/users/:user_id/prompts',
  UPLOAD_FILE: '/users/:user_id/endcode-files',
  ADD_DOCUMENT_TO_RESOURCE:
    '/users/:user_id/resources/:resource_id/documents/files',

  // Workspaces
  GET_WORKSPACE: '/users/profile/workspaces',
};

export const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const HTTP_STATUS = {
  OK: 'OK',
  CREATED: 'Created',
  NO_CONTENT: 'No Content',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  CONFLICT: 'Conflict',
  NETWORK_ERROR: 'Network Error',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
};
