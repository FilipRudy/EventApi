import { IsDate, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UserDTO {
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;
}
