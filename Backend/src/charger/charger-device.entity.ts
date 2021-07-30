import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseType } from '../customization/graphql/base.type';
import {
  ChargeDeviceLocation,
  ChargerConnector,
  DeviceOwner,
  DeviceController,
} from './types/charger-device.types';

import { Point } from 'geojson';

@Entity()
@ObjectType('ChargerDevice', { implements: [BaseType] })
export class ChargerDevice extends BaseType {
  @Column()
  @Field(type => String, { nullable: true })
  ChargeDeviceId?: string;

  @Field(type => String, { nullable: true })
  @Column()
  ChargeDeviceRef?: string;

  @Field(type => String, { nullable: true })
  @Column()
  ChargeDeviceName?: string;

  @Field(type => String, { nullable: true })
  @Column()
  ChargeDeviceText?: string;

  @Field(type => ChargeDeviceLocation)
  @Column()
  ChargeDeviceLocation: ChargeDeviceLocation;

  @Field(type => String, { nullable: true })
  @Column()
  ChargeDeviceManufacturer?: string;

  @Field(type => String, { nullable: true })
  @Column()
  ChargeDeviceModel?: string;

  @Field(type => String, { nullable: true })
  @Column()
  PublishStatusID?: string;

  @Field(type => String, { nullable: true })
  @Column()
  DateCreated?: string;

  @Field(type => String, { nullable: true })
  @Column()
  DateUpdated?: string;

  @Field(type => String, { nullable: true })
  @Column()
  Attribution?: string;

  @Field(type => String, { nullable: true })
  @Column()
  DateDeleted?: string;

  @Field(type => [ChargerConnector])
  @Column()
  Connector: ChargerConnector[];

  @Field(type => DeviceOwner)
  @Column()
  DeviceOwner: DeviceOwner;

  @Field(type => DeviceController)
  @Column()
  DeviceController: DeviceController;

  @Field(type => String, { nullable: true })
  @Column()
  DeviceAccess: string[];

  @Field(type => String, { nullable: true })
  @Column()
  DeviceNetworks?: string;

  @Field(type => String, { nullable: true })
  @Column()
  ChargeDeviceStatus?: string;

  @Field(type => String, { nullable: true })
  @Column()
  PublishStatus?: string;

  @Field(type => String, { nullable: true })
  @Column()
  DeviceValidated?: string;

  @Field(type => String, { nullable: true })
  @Column()
  RecordModerated?: string;

  @Field(type => String, { nullable: true })
  @Column()
  RecordLastUpdated?: string;

  @Field(type => String, { nullable: true })
  @Column()
  RecordLastUpdatedBy?: string;

  @Field(type => Boolean)
  @Column()
  PaymentRequiredFlag: boolean;

  @Field(type => String, { nullable: true })
  @Column()
  PaymentDetails?: string;

  @Field(type => Boolean)
  @Column()
  SubscriptionRequiredFlag: boolean;

  @Field(type => String, { nullable: true })
  @Column()
  SubscriptionDetails?: string;

  @Field(type => Boolean)
  @Column()
  ParkingFeesFlag: boolean;

  @Field(type => String, { nullable: true })
  @Column()
  ParkingFeesDetails?: string;

  @Field(type => String, { nullable: true })
  @Column()
  ParkingFeesUrl?: string;

  @Field(type => Boolean)
  @Column()
  AccessRestrictionFlag: boolean;

  @Field(type => String, { nullable: true })
  @Column()
  AccessRestrictionDetails?: string;

  @Field(type => Boolean)
  @Column()
  PhysicalRestrictionFlag: boolean;

  @Field(type => String, { nullable: true })
  @Column()
  PhysicalRestrictionText?: string;

  @Field(type => Boolean)
  @Column()
  OnStreetFlag: boolean;

  @Field(type => String, { nullable: true })
  @Column()
  LocationType?: string;

  @Field(type => String, { nullable: true })
  @Column()
  Bearing?: string;

  @Field(type => Boolean)
  @Column()
  Accessible24Hours: boolean;

  // @Field(type => Point, { defaultValue: null })
  @Column()
  Location: Point;
}
