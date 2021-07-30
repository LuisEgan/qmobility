import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchPoint {
  @Field(type => String)
  latitude: string;

  @Field(type => String)
  longitude: string;

  @Field(type => Number)
  found: number;
}
