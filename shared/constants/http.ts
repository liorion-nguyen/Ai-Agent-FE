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
  CREATE_CHATBOT_DB: '/users/:user_id/chatbots',
  CREATE_CHATBOT_COZE: '/users/:user_id/chatbots/:chatbot_id',
  UPDATE_CHATBOT_CONFIG_BASIC:
    '/users/:user_id/chatbots/:chatbot_id/config-basic',
  UPDATE_CHATBOT_PROMPT: '/users/:user_id/chatbots/:chatbot_id/import-prompts',
  ADD_RESOURCE_TO_CHATBOT:
    '/users/:user_id/chatbots/:chatbot_id/import-documents',
  PUBLISH_CHATBOT: '/users/:user_id/chatbots/:chatbot_id/publish',
  CREATE_ONBOARDING_CHATBOT: '/users/:user_id/chatbots/:chatbot_id/onboarding',
  UPDATE_ONBOARDING_CHATBOT:
    '/users/:user_id/chatbots/:chatbot_id/onboarding/:onboarding_id',
  CREATE_CHATBOT_PROMPT: '/users/:user_id/prompts',
  GET_CHATBOT_TOKENS: 'users/profile/chatbot-token',
  CREATE_CHATBOT_TOKEN: 'chatbot-tokens/generate-chatbot-token',

  // Models
  GET_MODELS: '/chatbot-models',

  // Messages
  SEND_MESSAGE_REVIEW: '/users/:user_id/chatbots/:chatbot_id/chat',
  SEND_MESSAGE: '/users/:user_id/chatbots/:chatbot_id/iframe/chat',
  INIT_CHECK_ACTIVE_CHATBOT:
    '/chatbot-embed/init?chatbotId=:chatbot_id&userId=:user_id&token=:token',
  CREATE_CONVERSATION: '/conversations',
  // Resources
  GET_ALL_RESOURCES: '/users/profile/resources',
  GET_RESOURCE_BY_ID: '/users/profile/resources/:id',
  CREATE_RESOURCE: '/users/:user_id/resources',
  CREATE_PROMPT: '/users/:user_id/prompts',
  ENCODE_FILE: '/users/:user_id/endcode-files',
  UPLOAD_FILE: '/users/:user_id/resources/:resource_id/documents/files',
  ADD_DOCUMENT_TO_RESOURCE:
    '/users/:user_id/resources/:resource_id/documents/files',

  // Workspaces
  GET_WORKSPACE: '/users/profile/workspaces',

  // Subscriptions
  GET_SUBSCRIPTIONS: '/subscriptions',
  GET_SUBSCRIPTION: '/users/profile/subscription',
  GET_SUBSCRIPTION_BY_ID: '/subscriptions/:id',
  SUBSCRIBE_SUBSCRIPTION: '/subscriptions/subscribe',
  UPGRADE_SUBSCRIPTION: '/subscriptions/upgrade',
  CANCEL_SUBSCRIPTION: '/subscriptions/cancel',
  RENEW_SUBSCRIPTION: '/subscriptions/renew',

  // Members
  GET_MEMBERS: 'workspaces/:workspace_id/members?user_id=:user_id',
  ADD_MEMBER: 'workspaces/:workspace_id/members',

  // Forms
  GET_FORMS: 'workspaces/:workspace_id/forms?user_id=:user_id',
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
