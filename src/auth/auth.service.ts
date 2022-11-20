import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../common/utils/bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneForAuth(email);
    if (user && (await comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
