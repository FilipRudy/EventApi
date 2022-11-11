import { EventType } from '../enums/audit-log.enum';
import { User } from '../../user/entities/user.entity';

export interface AuditLogInterface {
  auditLogType: EventType;
  details?: string;
  userId?: User;
}
