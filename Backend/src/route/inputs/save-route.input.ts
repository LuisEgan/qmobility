import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SaveMyRouteInput {
  @Field()
  origin: string;

  @Field()
  destination: string;

  @Field()
  friendlyName: string;

  @Field()
  category: string;

  @Field()
  frequency: string;

  @Field({ nullable: true })
  kwh?: number;

  @Field({ nullable: true })
  totalDistance?: number;

  @Field({ nullable: true })
  totalTime?: number;

  @Field({ nullable: true })
  carId: number;
}
