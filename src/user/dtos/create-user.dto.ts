import { IsDate, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;
}
