import { HttpException, InternalServerErrorException } from '@nestjs/common';
export class HttpExceptionHelper {
  static from(error): HttpException {
    if (error.name === 'AxiosError') {
      return new HttpException(error.response?.data, error.response?.status);
    }
    if (error instanceof HttpException) {
      return error;
    }
    return new InternalServerErrorException(error.message);
  }
}
