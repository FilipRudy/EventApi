import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EventType } from '../enums/audit-log.enum';

@Entity('audit_log')
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  eventType: EventType;

  @Column({
    type: 'json',
  })
  details: string;

  @ManyToOne(() => User, (userId) => userId.audit_log)
  @JoinColumn()
  userId: number;
}
