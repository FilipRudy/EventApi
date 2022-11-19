import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Get('/byName/:firstName')
  async findOneByName(@Param('firstName') firstName: string): Promise<User> {
    return this.userService.findOneByName(firstName);
  }

  @Post()
  async login(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Post()
  async create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() UserDTO: UserDTO,
  ) {
    return this.userService.update(userId, UserDTO);
  }
}
