import { Field, InputType } from '@nestjs/graphql';

const StringArrayReturn = () => [String];

@InputType()
export class VehicleModelsInput {
  @Field(StringArrayReturn, { nullable: true })
  makes?: string[];
}
