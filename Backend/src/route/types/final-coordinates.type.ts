import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FinalCoordinates {
  @Field(type => Number)
  latitude: number;
  @Field(type => Number)
  longitude: number;
}
