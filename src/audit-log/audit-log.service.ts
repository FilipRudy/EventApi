import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { EventType } from './enums/audit-log.enum';
import { User } from '../user/entities/user.entity';
import { AuditLogInterface } from './intefaces/audit-log.interface';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogsRepository: Repository<AuditLog>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<AuditLog[]> {
    return this.auditLogsRepository.find();
  }

  async create(
    auditLogType: EventType,
    details?: string,
    user?: User,
  ): Promise<void> {
    const newAuditLog: AuditLogInterface = {
      auditLogType,
      details,
      user,
    };

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await this.auditLogsRepository.create(newAuditLog);

    try {
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
