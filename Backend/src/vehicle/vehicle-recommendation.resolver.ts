import { UseGuards } from '@nestjs/common';
import { ResolveField, Parent, Resolver, Args, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { VehicleCategoryEnum } from './enums/vehicle-category.enum';
import { VehicleRecommendation } from './vehicle-recommendation.entity';
import { VehicleService } from './vehicle.service';

@Resolver(() => VehicleRecommendation)
export class VehicleRecommendationResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query(() => [VehicleRecommendation], {
    description: 'return the eve recommendation based on the category',
  })
  @UseGuards(GqlAuthGuard)
  vehicleRecommendation(
    @Args('category') category: VehicleCategoryEnum,
  ): Promise<VehicleRecommendation[]> {
    return this.vehicleService.vehicleRecommendations(category);
  }

  @ResolveField()
  async vehicle(@Parent() vehicleRecommendation: VehicleRecommendation) {
    return this.vehicleService.getVehicle(vehicleRecommendation.vehicle);
  }
}
