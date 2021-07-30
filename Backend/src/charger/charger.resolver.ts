import { ChargerDevice } from './charger-device.entity';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { ChargerService } from './charger.service';
import { GetNearestChargerInput } from './inputs/get-nearest-charges.input';

@Resolver(() => ChargerDevice)
export class ChargerResolver {
  constructor(private readonly chargerDeviceService: ChargerService) {}

  @Query(() => [ChargerDevice], {
    description: 'Get all chargers in the UK',
  })
  // @UseGuards(GqlAuthGuard)
  getAllChargers(): Promise<ChargerDevice[]> {
    return this.chargerDeviceService.getAllChargers();
  }

  @Query(() => ChargerDevice, {
    description: 'Get charger information by charger id',
  })
  @UseGuards(GqlAuthGuard)
  getChargerDevice(
    @Args('id') chargerDeviceId: string,
  ): Promise<ChargerDevice> {
    return this.chargerDeviceService.getCharger(chargerDeviceId);
  }

  @Query(() => [ChargerDevice], {
    description:
      'Get the nearest chargers to the latitude, longitude and distance',
  })
  @UseGuards(GqlAuthGuard)
  getNearestChargerDevices(
    @Args('getNearestChargerInput')
    { latitude, longitude, distance }: GetNearestChargerInput,
  ): Promise<ChargerDevice[]> {
    return this.chargerDeviceService.getNearestCharger(
      longitude,
      latitude,
      distance,
    );
  }
}
