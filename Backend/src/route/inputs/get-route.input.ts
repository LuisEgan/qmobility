import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetRouteInput {
  @Field()
  origin: string;

  @Field()
  destination: string;

  @Field()
  car_id: number;

  @Field({ nullable: true })
  car_charge: number;

  @Field({ nullable: true })
  chargers_limit: number;

  @Field({ nullable: true })
  car_tolerance: number;

  @Field({ nullable: true })
  charger_distance: number;
}
