import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entiy';

@Entity('User')
export class UserEntity extends DefaultEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;
}
