import { FinalCoordinates } from './final-coordinates.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Route {
  @Field()
  Origin: string;

  @Field()
  Destination: string;

  @Field()
  Distance: number;

  @Field()
  Distance_Difference: number;

  @Field()
  Time: number;

  @Field()
  Time_Difference: number;

  @Field()
  Time_Difference_With_Charges: number;

  @Field()
  Stops: number;

  @Field({ nullable: true })
  Total_kWh: number;

  @Field({ nullable: true })
  Total_kWh_Difference: number;

  @Field(type => [FinalCoordinates])
  Route_Coords: FinalCoordinates[];

  @Field()
  Encoded_Path: string;
}
