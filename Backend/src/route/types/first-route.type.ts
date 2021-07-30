import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FirstRoute {
  @Field(type => Number)
  Time: number;

  @Field(type => Number)
  Distance: number;

  @Field(type => Number)
  Total_kWh: number;
}
