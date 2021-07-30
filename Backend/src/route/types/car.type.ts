import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Maker: string;

  @Field(type => String)
  Model: string;

  @Field(type => String)
  Standard_Plug: string;

  @Field(type => Number)
  Standard_Charge_Time: number;

  @Field(type => String)
  Fast_Plug: string;

  @Field(type => Number)
  Fast_Charge_Time: number;

  @Field(type => Number)
  Initial_Range: number;

  @Field(type => Number)
  Initial_Battery: number;

  @Field(type => Number)
  Range_Real: number;

  @Field(type => Number)
  Efficency_Real: number;

  @Field(type => Number)
  Battery_Capacity: number;

  @Field(type => Number)
  Tolerance: number;
}
