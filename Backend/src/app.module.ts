import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './vehicle/vehicle.module';
import { ChargerModule } from './charger/charger.module';
import { RouteModule } from './route/route.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      include: [
        UserModule,
        AuthModule,
        VehicleModule,
        RouteModule,
        ChargerModule,
        StatsModule,
      ],
      useGlobalPrefix: false,
      fieldResolverEnhancers: ['guards', 'interceptors'],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    CommonModule,
    VehicleModule,
    RouteModule,
    ChargerModule,
    StatsModule,
  ],
})
export class AppModule {}
