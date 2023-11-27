import { User } from './user';

describe('UserEntities', () => {
  const createUserCommand = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@test.com',
    skillName: 'Javascript',
  };

  it('Should create user', () => {
    const user = new User(createUserCommand);
    expect(user instanceof User).toBeTruthy();
  });

  it('Should create user with fullname', () => {
    const user = new User(createUserCommand);
    expect(user.fullname).toBe('John Doe');
  });

  it('Should create user with skillName', () => {
    const user = new User(createUserCommand);
    expect(user.skillName).toBe('Javascript');
  });
});
