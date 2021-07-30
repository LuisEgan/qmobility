import { ChargerDevice } from '../charger-device.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SchemeData {
  @Field(type => String)
  OrganisationName: string;

  @Field(type => String)
  Website: string;

  @Field(type => String)
  TelephoneNo: string;
}

@ObjectType()
export class Scheme {
  @Field(type => String)
  SchemeCode: string;

  @Field(type => SchemeData)
  SchemeData: SchemeData;
}

@ObjectType()
export class Point {
  @Field(type => String, { defaultValue: 'point' })
  type: string;

  @Field(type => [Number])
  coordinates: Number[];
}

@ObjectType()
export class Address {
  @Field(type => String, { nullable: true })
  SubBuildingName?: string;

  @Field(type => String)
  BuildingName: string;

  @Field(type => String)
  BuildingNumber: string;

  @Field(type => String)
  Thoroughfare: string;

  @Field(type => String)
  Street: string;

  @Field(type => String, { nullable: true })
  DoubleDependantLocality?: string;

  @Field(type => String, { nullable: true })
  DependantLocality?: string;

  @Field(type => String)
  PostTown: string;

  @Field(type => String)
  County: string;

  @Field(type => String)
  PostCode: string;

  @Field(type => String)
  Country: string;

  @Field(type => String, { nullable: true })
  UPRN?: string;
}

@ObjectType()
export class ChargeDeviceLocation {
  @Field(type => String)
  Latitude: string;

  @Field(type => String)
  Longitude: string;

  @Field(type => Address)
  Address: Address;

  @Field(type => String, { nullable: true })
  LocationShortDescription?: string;

  @Field(type => String)
  LocationLongDescription: string;
}

@ObjectType()
export class ChargerConnector {
  @Field(type => String)
  ConnectorId: string;

  @Field(type => String)
  ConnectorType: string;

  @Field(type => String)
  RatedOutputkW: string;

  @Field(type => String)
  RatedOutputVoltage: string;

  @Field(type => String)
  RatedOutputCurrent: string;

  @Field(type => String)
  ChargeMethod: string;

  @Field(type => String)
  ChargeMode: string;

  @Field(type => String)
  ChargePointStatus: string;

  @Field(type => String)
  TetheredCable: string;

  @Field(type => String)
  Information: string;

  @Field(type => String)
  Validated: string;
}

@ObjectType()
export class DeviceOwner {
  @Field(type => String)
  OrganisationName: string;

  @Field(type => String)
  SchemeCode: string;

  @Field(type => String)
  Website: string;

  @Field(type => String)
  TelephoneNo: string;
}

@ObjectType()
export class DeviceController {
  @Field(type => String)
  OrganisationName: string;

  @Field(type => String)
  SchemeCode: string;

  @Field(type => String)
  Website: string;

  @Field(type => String)
  TelephoneNo: string;
}

@ObjectType()
export class ChargerAPIResponse {
  Scheme: Scheme;
  ChargeDevice: ChargerDevice[];
}
