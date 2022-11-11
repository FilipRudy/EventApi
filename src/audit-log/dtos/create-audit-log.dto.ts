import { EventType } from '../enums/audit-log.enum';
import { User } from '../../user/entities/user.entity';
import { IsEnum, IsString } from 'class-validator';

export class AuditLogDTO {
  @IsEnum(EventType)
  event_type: EventType;

  @IsString()
  details: string;

  user: User;
}
