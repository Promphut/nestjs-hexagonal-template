import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomsInternalServerErrorException extends HttpException {
  constructor(errorMessage?: string) {
    super(errorMessage ?? 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
