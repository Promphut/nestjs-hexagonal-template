import { Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/user';
import { CreateUserCommand } from '../commands/createUser.command';

@Injectable()
export class UserFactory {
  public static CreateUser(createUserCommand: CreateUserCommand): User {
    const user = new User({
      firstname: createUserCommand.firstname,
      lastname: createUserCommand.lastname,
      email: createUserCommand.email,
      skillName: createUserCommand.skillName,
    });
    return user;
  }
}
