import { Injectable } from '@nestjs/common';

import { User } from '../../../../domain/entities/user';
import { UserFactory } from '../../../../application/factories/user.factory';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserMapper {
  public static toDomain(userModel: UserModel): User {
    const user = UserFactory.CreateUser(userModel);
    return user;
  }
}
