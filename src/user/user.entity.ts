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
    type: 'varchar',
    length: 255,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  lastName: string;

  @Column({
    select: false,
    type: 'varchar',
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp with time zone',
  })
  updatedAt?: Date;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp with time zone',
  })
  deletedAt?: Date;
  /*
  @OneToMany(() => AuditLogEntity, (audit_log) => audit_log.user)
  auditLogs: AuditLogEntity;

  @ManyToOne(() => EventEntity, (event) => event.user)
  events: EventEntity;*/
}
