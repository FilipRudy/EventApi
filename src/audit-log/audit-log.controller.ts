import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuditLogService } from './audit-log.service';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private auditLogService: AuditLogService) {}

  @Get()
  async findAll() {
    return this.auditLogService.findAll();
  }
}
