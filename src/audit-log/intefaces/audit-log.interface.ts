import { EventType } from '../enums/audit-log.enum';
import { User } from '../../user/entities/user.entity';

export interface AuditLogInterface {
  eventType: EventType;
  details?: string;
  user?: User;
}
