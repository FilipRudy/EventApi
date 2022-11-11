import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { EventType } from './enums/audit-log.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuditLogService {
  //Here starts the fragment that causes the error
  constructor(
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    return this.auditLogsRepository.find();
  }

  async create(auditLogType: EventType, details?: string, userId?: User) {
    const newAuditLog = {
      eventType: auditLogType,
      details: details,
      user: userId,
    };

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.auditLogsRepository.create(newAuditLog);
      await this.auditLogsRepository.save(newAuditLog);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
