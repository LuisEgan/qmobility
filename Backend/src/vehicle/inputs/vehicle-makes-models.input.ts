import { Field, InputType } from '@nestjs/graphql';

const StringArrayReturn = () => [String];

@InputType()
export class VehicleByMakesAndModelsInput {
  @Field(StringArrayReturn, { nullable: true })
  makes?: string[];

  @Field(StringArrayReturn, { nullable: true })
  models?: string[];

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  skip?: number;
}
