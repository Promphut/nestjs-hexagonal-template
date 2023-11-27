import { User } from '../../domain/entities/user';

export interface UserRepository {
  createUser(user: User): Promise<User | undefined>;

  getUser(userId: string): Promise<User | undefined>;

  deleteUser(userId: string): Promise<User | undefined>;
}
