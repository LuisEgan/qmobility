import { Module, HttpModule } from '@nestjs/common';
import { ChargerService } from './charger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargerDevice } from './charger-device.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { ChargerResolver } from './charger.resolver';

@Module({
  providers: [ChargerService, ChargerResolver],
  imports: [
    TypeOrmModule.forFeature([ChargerDevice]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
})
export class ChargerModule {}
