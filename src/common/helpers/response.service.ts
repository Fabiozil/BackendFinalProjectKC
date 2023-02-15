import { Injectable } from '@nestjs/common';

import { ResponseDTO, Status, StandardData, ResponseErrors } from '../dto/responses.dto';

@Injectable()
export class ResponseService {
  async success(
    message: string,
    data: StandardData,
  ): Promise<ResponseDTO> {
    return {
      status: Status.success,
      message,
      data
    }
  }

  async error(
    message: string,
    errors: ResponseErrors[],
  ): Promise<ResponseDTO> {
    return {
      status: Status.error,
      message,
      errors
    }
  }
}

