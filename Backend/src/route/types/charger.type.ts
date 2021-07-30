import { Connector } from './connector.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Charger {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Name: string;

  @Field(type => Number)
  Distance: number;

  @Field(type => Number)
  latitude: number;

  @Field(type => Number)
  longitude: number;

  @Field(type => [Connector])
  Connectors: Connector[];

  @Field(type => String)
  Type: string;
}
