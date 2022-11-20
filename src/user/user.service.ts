import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDTO } from './dtos/create-user.dto';
import { EventType } from '../audit-log/enums/audit-log.enum';
import { AuditLogService } from '../audit-log/audit-log.service';
import { UserRole } from './enums/user-role.enum';
import { encodePassword } from '../common/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly auditLogService: AuditLogService,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneByOrFail({ id: id }).catch(() => {
      throw new NotFoundException(`User ${id} not found`);
    });
  }

  async findOneForAuth(email: string): Promise<User> {
    return this.usersRepository
      .findOneOrFail({
        where: { email },
        select: ['id', 'firstName', 'lastName', 'role', 'email', 'password'],
      })
      .catch(() => {
        throw new NotFoundException(`User with email: ${email} not found`);
      });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //@TODO Remove User password in audit log
  async create(userDTO: UserDTO): Promise<User> {
    const password1 = await encodePassword(userDTO.password);
    const newUser = this.usersRepository.create({
      ...userDTO,
      role: UserRole.USER,
      password: password1,
    });

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.usersRepository.save(newUser);
      await this.auditLogService.create(
        EventType.USER_CREATE_SUCCESS,
        JSON.stringify(userDTO),
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await this.auditLogService.create(
        EventType.USER_CREATE_FAIL,
        JSON.stringify(userDTO),
      );
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    delete newUser.password;

    return newUser;
  }

  async update(id: number, userDTO: UserDTO): Promise<User> {
    const user = await this.usersRepository.preload({
      id: id,
      ...userDTO,
    });

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.usersRepository.save(user);
      await this.auditLogService.create(
        EventType.USER_UPDATE_SUCCESS,
        JSON.stringify(userDTO),
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await this.auditLogService.create(
        EventType.USER_UPDATE_FAIL,
        JSON.stringify(userDTO),
      );
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  async delete(id: number) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.usersRepository.delete({
        id: id,
      });
      await this.auditLogService.create(
        EventType.USER_DELETE_SUCCESS,
        `Deleted user at id: ${id}`,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await this.auditLogService.create(
        EventType.USER_DELETE_FAIL,
        `Failed to delete user at id: ${id}`,
      );
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return id;
  }
}
