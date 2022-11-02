import {
  JoinColumn,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { timestamp } from 'rxjs';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'string',
    length: 255,
  })
  title: string;

  @Column({
    type: 'string',
    length: 255,
  })
  description: string;

  @Column({
    type: 'timestamp',
  })
  date: Date;

  @OneToMany(() => UserEntity, (user) => user.event)
  @JoinColumn()
  users: User;
}
