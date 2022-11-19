import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../user/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(username);

    if (user.password === password) {
      const { password, firstName, ...rest } = user;

      return rest;
    }

    return user;
  }

  async login(user: any) {
    const payload = { UserDTO };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
