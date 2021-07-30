import { Resolver, Args, Query } from '@nestjs/graphql';
import { Vehicle } from './vehicle.entity';
import { VehicleService } from './vehicle.service';
import { VehicleSearchInput } from './inputs/vehicle-search-input';
import { IceVehicle } from './types/ice-vehicle.type';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { GqlUser } from '../customization/decorators/decorators';
import { User } from '../user/user.entity';
import { VehicleByMakesAndModelsInput } from './inputs/vehicle-makes-models.input';
import { VehicleModelsInput } from './inputs/vehicle-models.input';
import { BookTestDriveInput } from './inputs/book-test-drive.input';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Query(() => Vehicle, { description: 'return a vehicle by Vehicle_ID' })
  vehicle(@Args('id') id: number) {
    return this.vehicleService.getVehicle(id);
  }

  @Query(() => [Vehicle], {
    description:
      'return a vehicle by search input this can be; Vehicle_Make o Vehicle_Model',
  })
  vehicles(
    @Args('vehicleSearchInput') vehicleSearchInput: VehicleSearchInput,
  ): Promise<Vehicle[]> {
    return this.vehicleService.getVehicles(vehicleSearchInput);
  }

  @Query(() => [Vehicle], {
    description: 'return vehicles by makes and models',
  })
  getVehicleByMakesAndModels(
    @Args('vehiclesByMakesAndModelsInput')
    vehiclesByMakesInput: VehicleByMakesAndModelsInput,
  ) {
    return this.vehicleService.getVehicleByMakesAndModels(vehiclesByMakesInput);
  }

  @Query(() => [String], {
    description: 'return a list of modles based on the makes',
  })
  getVehicleModels(
    @Args('vehiclesModelsInput') vehiclesModelsInput: VehicleModelsInput,
  ): Promise<string[]> {
    return this.vehicleService.getVehicleModels(vehiclesModelsInput);
  }

  @Query(() => [String], { description: 'returns all vehicle makes' })
  vehicleMakes() {
    return this.vehicleService.getVehicleMakes();
  }

  @Query(() => [String], {
    description: 'returns a list of vehicle body types',
  })
  vehicleBodyTypes() {
    return this.vehicleService.getVehicleBodyTypes();
  }

  @Query(() => IceVehicle, {
    description:
      'returns Internal Combustion Engine (ICE) vehicle and save it on the user',
  })
  @UseGuards(GqlAuthGuard)
  searchIceVehicle(
    @Args('plate') plate: string,
  ): Promise<IceVehicle | undefined> {
    return this.vehicleService.searchIceVehicle(plate);
  }

  @Query(() => Boolean, { description: 'book a test drive' })
  @UseGuards(GqlAuthGuard)
  bookTestDrive(@GqlUser() user: User) {
    return this.vehicleService.bookTestDrive(user);
  }

  @Query(() => Boolean, { description: 'book a test drive from catalog' })
  bookTestDriveCatalog(
    @Args('bookTestDriveInput', ValidationPipe)
    bookTestDriveInput: BookTestDriveInput,
  ) {
    return this.vehicleService.bookTestDriveCatalog(bookTestDriveInput);
  }
}
