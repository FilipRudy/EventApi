import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): string {
    return 'returning everyone';
  }

  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return this.userService.findOne(params);
  }

  @Post()
  async create(@Body() UserDTO: UserDTO) {
    return 'user created';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `user with id: ${id} deleted`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UserDTO: UserDTO) {
    return `user with id: ${id} updated`;
  }
}
