import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetNearestChargerInput {
  @Field(type => Number)
  latitude: number;

  @Field(type => Number)
  longitude: number;

  @Field(type => Number)
  distance: number;
}
