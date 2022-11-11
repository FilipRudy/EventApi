import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuditLogController } from './audit-log/audit-log.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ConfigModule.forRoot({ load: [appConfig] }),
    UserModule,
    AuditLogModule,
  ],
})
export class AppModule {}
