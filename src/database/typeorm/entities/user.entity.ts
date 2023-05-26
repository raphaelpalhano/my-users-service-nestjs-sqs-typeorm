import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity extends DefaultEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: 'birth_date' })
  birthDate: string;

  @Column({ type: 'int' })
  age: number;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPass() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  constructor(user?: Partial<UserEntity>) {
    super();
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.age = user?.age;
    this.birthDate = user?.birthDate;
    this.password = user?.password;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.deletedAt = user?.deletedAt;
  }
}
