import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomUnAuthorizedException extends HttpException {
  constructor(errorMessage?: string) {
    super(errorMessage ?? 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
