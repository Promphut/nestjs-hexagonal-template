import { Controller, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateUserDto } from '../dtos/createUserDto';
import { CreateUserUseCase } from '../../../application/usecases/createUser.usecase';

@Controller('user')
export class AppController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  public async createUser(@Res() res: Response, @Req() req: Request, @Query() payload: CreateUserDto) {
    const user = await this.createUserUseCase.handler(payload);
    return res.status(HttpStatus.OK).json(user);
  }
}
