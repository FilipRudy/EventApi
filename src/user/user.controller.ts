import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { PageOptionsDto } from '../page/dtos/page-options.dto';
import { PageDto } from '../page/dtos/page.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDTO>> {
    return this.userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.findOne(userId);
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
