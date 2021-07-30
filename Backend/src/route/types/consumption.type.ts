import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Consumption {
  @Field(type => Number)
  Leg_Distance: number;

  @Field(type => Number)
  Leg_Time: number;

  @Field(type => Number)
  Leg_kWh: number;

  @Field(type => Number)
  Leg_Residual_Battery: number;

  @Field(type => Number)
  Residual_Battery_Percentage: number;

  @Field(type => Number)
  TimeToCharge: number;
}
