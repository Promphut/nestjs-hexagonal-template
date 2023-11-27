import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomNotFoundException extends HttpException {
  constructor(errorMessage?: string) {
    super(errorMessage ?? 'Not Found', HttpStatus.NOT_FOUND);
  }
}
