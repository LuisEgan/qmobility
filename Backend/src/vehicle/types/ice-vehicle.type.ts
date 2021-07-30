import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('IceVehicleType')
@InputType()
export class IceVehicle {
  @Field()
  Make: string;

  @Field()
  MakeModel: string;

  @Field()
  Co2Emissions: number;

  @Field()
  YearMonthFirstRegistered: string;

  @Field()
  FuelType: string;

  @Field()
  SeatingCapacity: number;

  @Field()
  Colour: string;

  @Field()
  VehicleClass: string;

  @Field()
  VehiclePlate: string;

  @Field()
  DoorPlanLiteral: string;

  @Field()
  MaxSpeedKph: number;

  @Field()
  MaxSpeedMph: number;

  @Field()
  ModelVariant: string;

  @Field()
  EngineCapacity: string;
}
