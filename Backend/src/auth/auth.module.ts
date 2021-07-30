import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { CommonService } from '../common/common.service';
import { GqlAuthGuard } from './gql-auth.guard';

import * as config from 'config';
const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
    }),
    TypeOrmModule.forFeature([User]),
    HttpModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    JwtStrategy,
    GqlAuthGuard,
    CommonService,
  ],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
