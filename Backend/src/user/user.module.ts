import { Module, HttpModule } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CommonService } from '../common/common.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { Vehicle } from '../vehicle/vehicle.entity';
import { VehicleRecommendation } from '../vehicle/vehicle-recommendation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Vehicle, VehicleRecommendation]),
    HttpModule,
  ],
  providers: [UserService, UserResolver, CommonService, VehicleService],
  exports: [UserService],
})
export class UserModule {}
