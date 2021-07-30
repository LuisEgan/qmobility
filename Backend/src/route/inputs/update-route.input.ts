import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMyRouteInput {
  @Field()
  myRouteId: string;

  @Field({ nullable: true })
  friendlyName?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  frequency?: string;
}
