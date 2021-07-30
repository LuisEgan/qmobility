import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Connector {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Type: string;
}
