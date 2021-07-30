import { InputType, Field } from '@nestjs/graphql';

const ArrayNumberReturn = () => [Number];
const ArrayStringReturn = () => [String];

@InputType()
export class VehicleSearchInput {
  @Field({ nullable: true })
  Vehicle_Make?: string;

  @Field({ nullable: true })
  Vehicle_Model?: string;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  minPrice?: number;

  @Field({ nullable: true })
  maxPrice?: number;

  @Field(ArrayNumberReturn, { nullable: true })
  seats?: number[];

  @Field(ArrayStringReturn, { nullable: true })
  bodyType?: string[];

  @Field({ nullable: true })
  rangeMin?: number;

  @Field({ nullable: true })
  rangeMax?: number;
}
