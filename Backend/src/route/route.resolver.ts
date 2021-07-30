import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Route } from './types/route.type';
import { Routes } from './routes.type';
import { GetRouteInput } from './inputs/get-route.input';
import { RouteService } from './route.service';
import { MyRoute } from './my-route.entity';
import { SaveMyRouteInput } from './inputs/save-route.input';
import { GqlUser } from '../customization/decorators/decorators';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RecentRoutes } from './recent-routes.entity';
import { UpdateMyRouteInput } from './inputs/update-route.input';

@Resolver(() => Route)
export class RouteResolver {
  constructor(private readonly routeService: RouteService) {}

  @Query(() => Routes, {
    description: 'Get routes from qMobilityLegacyApi',
  })
  @UseGuards(GqlAuthGuard)
  async getRoutes(
    @Args('getRouteInput') getRouteInput: GetRouteInput,
    @GqlUser() user: User,
  ) {
    return this.routeService.getRoute(getRouteInput, user);
  }

  @Query(() => [MyRoute], { description: 'Get all user routes' })
  @UseGuards(GqlAuthGuard)
  async getMyRoutes(@GqlUser() user: User): Promise<MyRoute[]> {
    return this.routeService.myRoutes(user);
  }

  @Query(() => [RecentRoutes], { description: 'Get my recent routes' })
  @UseGuards(GqlAuthGuard)
  async getMyRecentRoutes(
    @Args('limit') limit: number,
    @GqlUser() user: User,
  ): Promise<RecentRoutes[]> {
    return this.routeService.getMyRecentRoutes(limit, user);
  }

  @Mutation(() => MyRoute, { description: 'Save user route' })
  @UseGuards(GqlAuthGuard)
  async saveMyRoute(
    @Args('saveMyRouteInput') saveMyRouteInput: SaveMyRouteInput,
    @GqlUser() user: User,
  ): Promise<MyRoute> {
    return this.routeService.saveMyRoute(saveMyRouteInput, user);
  }

  @Mutation(() => MyRoute, { description: 'Update my route' })
  async updateMyRoute(
    @Args('updateMyRouteInput') updateMyRouteInput: UpdateMyRouteInput,
  ): Promise<MyRoute> {
    return this.routeService.updateMyRoute(updateMyRouteInput);
  }

  @Mutation(() => Boolean, { description: 'Delete user route' })
  @UseGuards(GqlAuthGuard)
  async deleteMyRoute(@Args('myRouteId') myRouteId: string): Promise<boolean> {
    return this.routeService.deleteMyRoute(myRouteId);
  }
}
