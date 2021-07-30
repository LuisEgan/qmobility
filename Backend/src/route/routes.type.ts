import { FirstRoute } from './types/first-route.type';
import { Route } from './types/route.type';
import { Car } from './types/car.type';
import { Consumption } from './types/consumption.type';
import { SearchPoint } from './types/search-point.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { Charger } from './types/charger.type';

@ObjectType()
export class Routes {
  @Field()
  First_Route: FirstRoute;

  @Field()
  Route: Route;

  @Field()
  Car: Car;

  @Field(() => [Consumption])
  Consumption: Consumption[];

  @Field(() => [SearchPoint])
  SearchPoints: SearchPoint[];

  @Field()
  Chargers_Search_Radius: number;

  @Field(() => [[Charger]])
  Chargers: Charger[][];
}
