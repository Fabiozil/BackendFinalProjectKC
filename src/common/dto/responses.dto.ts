export enum Status {
  success = 'success',
  error = 'error',
}

export class StandardData {
  response: object[];
  pagination?: PaginationResponse;
}

export class ResponseErrors {
  message: string;
  field: string;
  code: number;
}
export class PaginationResponse {
  total: number;
  page: number;
  last_page: number;
}

export class ResponseDTO {
  status: Status;
  message: string;
  errors?: ResponseErrors[];
  data?: StandardData;
}
  