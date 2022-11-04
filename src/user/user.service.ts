import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private readonly users: User[] = [];

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findAll(): User[] {
    return this.users;
  }
}
