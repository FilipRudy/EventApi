import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Post()
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UserDTO: UserDTO) {
    return this.userService.update(parseInt(id), UserDTO);
  }
}
