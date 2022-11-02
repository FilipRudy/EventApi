import { PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm';
import { timestamp } from 'rxjs';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  title: string;

  @Column({
    length: 255,
  })
  description: string;

  @Column({
    type: 'timestamp'
  })
  date: Date;

  @OneToMany ( () => UserEntity, (user) => user.event)
  users: User
}
