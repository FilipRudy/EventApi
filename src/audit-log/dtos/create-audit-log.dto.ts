import { EventType } from '../enums/audit-log.enum';
import { User } from '../../user/entities/user.entity';

export class AuditLogDTO {
  event_type: EventType;
  details: string;
  user: User;
}
