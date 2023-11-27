import { mock } from 'jest-mock-extended';

import { UserRepository } from '../ports/user.repository';
import { SkillGateway } from '../ports/skill.gateway';
import { CreateUserUseCase } from './createUser.usecase';
import { BadRequestException } from '@nestjs/common';
import { UserFactory } from '../factories/user.factory';
import { User } from '../../domain/entities/user';

describe('CreateUserUseCase', () => {
  let userRepository = mock<UserRepository>();
  let skillGateway = mock<SkillGateway>();
  let createUserUseCase: CreateUserUseCase;
  beforeEach(async () => {
    userRepository = mock<UserRepository>();
    skillGateway = mock<SkillGateway>();
    createUserUseCase = new CreateUserUseCase(userRepository, skillGateway);
  });

  const userPayload = {
    email: 'john@test.com',
    firstname: 'John',
    lastname: 'Doe',
    skillId: '1',
  };

  it('Should throw BadRequest if skill is not exists.', async () => {
    skillGateway.getSkill.mockResolvedValue(undefined);

    await expect(createUserUseCase.handler(userPayload)).rejects.toThrow(
      new BadRequestException('SkillId does not exist'),
    );
  });

  it('Should get skill before create user', async () => {
    skillGateway.getSkill.mockResolvedValue({
      id: '1',
      name: 'NodeJs',
      description: 'NodeJs',
    });
    createUserUseCase.handler(userPayload);
    expect(skillGateway.getSkill).toBeCalled();
  });

  it('Should create user and return User', async () => {
    const skill = {
      id: '1',
      name: 'NodeJs',
      description: 'NodeJs',
    };
    skillGateway.getSkill.mockResolvedValue(skill);
    const _user = UserFactory.CreateUser({
      email: userPayload.email,
      firstname: userPayload.firstname,
      lastname: userPayload.lastname,
      skillName: skill.name,
    });
    userRepository.createUser.mockResolvedValue(_user);
    const createdUser = await createUserUseCase.handler(userPayload);
    expect(createdUser instanceof User).toBeTruthy();
  });
});
