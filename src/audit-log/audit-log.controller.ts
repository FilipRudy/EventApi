import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('audit-logs')
export class AuditLogController {
  @Get()
  findAll(): string {
    return 'returning everything';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);

    return `${params.id}`;
  }
}
