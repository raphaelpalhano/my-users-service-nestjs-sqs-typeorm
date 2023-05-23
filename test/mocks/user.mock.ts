import { UserEntity } from 'src/modules/users/database/typeorm/entities';
import { faker } from '@faker-js/faker';
import { userAge } from 'src/core/helpers';

export const userMock = (qtUsers: number): UserEntity[] => {
  const yearBorn = '1998-05-22';
  let user: UserEntity;
  const users = new Array<UserEntity>();
  for (let i = 0; i < qtUsers; i++) {
    user = new UserEntity({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 9, prefix: 'Ra.221' }),
      birthDate: '1998-05-22',
      age: userAge(yearBorn),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    users.push(user);
  }

  return users;
};

export type userMock = {
  id: string;
  name: string;
  age: number;
  birthDate: string;
  email: string;
};
