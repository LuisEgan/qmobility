import { Module, HttpModule } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleResolver } from './vehicle.resolver';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CommonService } from '../common/common.service';
import { VehicleRecommendation } from './vehicle-recommendation.entity';
import { VehicleRecommendationResolver } from './vehicle-recommendation.resolver';

@Module({
  providers: [
    VehicleService,
    VehicleResolver,
    VehicleRecommendationResolver,
    UserService,
    CommonService,
  ],
  imports: [
    TypeOrmModule.forFeature([Vehicle, VehicleRecommendation, User]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
})
export class VehicleModule {}
