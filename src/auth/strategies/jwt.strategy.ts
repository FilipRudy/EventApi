import { PassportStrategy } from '@nestjs/passport/dist';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '${SECRET}',
    });
  }
  async validate(payload: any) {
    const user = {
      id: payload.id,
      role: payload.role,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
    };

    return {
      user,
    };
  }
}
