import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor(errorMessage?: string) {
    super(errorMessage ?? 'Forbidden', HttpStatus.FORBIDDEN);
  }
}
