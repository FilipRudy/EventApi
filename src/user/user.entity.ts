import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'string',
    length: 255,
  })
  firstName: string;

  @Column({
    type: 'string',
    length: 255,
  })
  lastName: string;

  @Column({
    select: false,
    type: 'string',
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  updatedAt?: Date;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  deletedAt?: Date;

  @OneToMany(() => AuditLogEntity, (audit_log) => audit_log.user)
  auditLogs: AuditLogEntity;

  @ManyToOne(() => EventEntity, (event) => event.user)
  events: EventEntity;
}
