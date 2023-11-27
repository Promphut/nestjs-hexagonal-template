import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/entities/user';

import { UserRepository } from '../../../application/ports/user.repository';
import { UserMapper } from './mappers/user.mapper';
import { UserSchemaMongo } from './schemas/user.schema';

@Injectable()
export class UserRepositoryMongo implements UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<UserSchemaMongo>) {}

  async createUser(user: User): Promise<User | undefined> {
    let userCreated = new this.userModel(user);
    userCreated = await userCreated.save();
    return userCreated ? UserMapper.toDomain(userCreated) : undefined;
  }

  async getUser(userId: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ userId }).lean().exec();
    return user ? UserMapper.toDomain(user) : undefined;
  }

  async deleteUser(userId: string): Promise<User | undefined> {
    const userDeleted = await this.userModel.findOneAndDelete({ userId }).lean().exec();
    return userDeleted ? UserMapper.toDomain(userDeleted) : undefined;
  }
}
