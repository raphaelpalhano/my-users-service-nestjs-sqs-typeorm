import { DefaultEntity } from '../../database/typeorm/entities/default.entity';

type Users = DefaultEntity & {
  name: string;
  email: string;
  birthDay: Date;
};

export class ListUsersDto {
  users: Users[];
}
