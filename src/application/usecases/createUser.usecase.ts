import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';
import { SkillGateway } from '../ports/skill.gateway';
import { UserFactory } from '../factories/user.factory';
import { IUser } from '../../domain/entities/user';

export interface ICreateUserPayload {
  email: string;
  firstname: string;
  lastname: string;
  skillId: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    @Inject('SkillGateway') private skillGateway: SkillGateway,
  ) {}

  public async handler(payload: ICreateUserPayload): Promise<IUser> {
    try {
      const skill = await this.skillGateway.getSkill(payload.skillId); //?
      if (!skill) throw new BadRequestException('SkillId does not exist');
      const userEntity = UserFactory.CreateUser({
        email: payload.email,
        firstname: payload.firstname,
        lastname: payload.lastname,
        skillName: skill?.name,
      });
      const user = await this.userRepository.createUser(userEntity); //?

      return user;
    } catch (error) {
      if (error) throw error;
      else throw new InternalServerErrorException();
    }
  }
}
