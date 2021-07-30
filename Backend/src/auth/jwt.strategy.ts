import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayloadType } from './jwt-payload.type';
import { User } from '../user/user.entity';

import * as config from 'config';
const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayloadType): Promise<User> {
    const user = await this.authService.validate(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
