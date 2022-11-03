import {
  JoinColumn,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
} from 'typeorm';
import { timestamp } from 'rxjs';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'timestamp with time zone',
  })
  date: Date;

  @ManyToMany(() => UserEntity, (user) => user.event)
  @JoinColumn()
  users: User;
}
