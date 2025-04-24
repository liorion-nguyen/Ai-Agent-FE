import { HTTP_CODE } from '@/shared/constants';

interface MessageError {
  message: string | string[];
  error: string;
  statusCode: number | string;
}

export class APIErrorHandler {
  statusCode: number;
  message: MessageError;
  path: string;
  timestamp: string;

  constructor(
    statusCode: number,
    message: MessageError,
    path: string,
    timestamp: string,
  ) {
    this.statusCode = statusCode;
    this.path = path;
    this.message = message;
    this.timestamp = timestamp;
  }

  // isNetworkError(): boolean {
  //   return this.statusCode === HTTP_STATUS.NETWORK_ERROR;
  // }

  isAuthError(): boolean {
    return this.statusCode === HTTP_CODE.UNAUTHORIZED;
  }

  isForbiddenError(): boolean {
    return this.statusCode === HTTP_CODE.FORBIDDEN;
  }

  isNotFoundError(): boolean {
    return this.statusCode === HTTP_CODE.NOT_FOUND;
  }

  isServerError(): boolean {
    return this.statusCode
      ? this.statusCode >= HTTP_CODE.INTERNAL_SERVER_ERROR
      : false;
  }
}
