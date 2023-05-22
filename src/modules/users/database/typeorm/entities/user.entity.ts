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

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'int' })
  age: number;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPass() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
