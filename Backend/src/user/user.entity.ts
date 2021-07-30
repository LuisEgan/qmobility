import { Entity, Column } from 'typeorm';
import { UserRoleEnum } from './enums/user-role.enum';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseType } from '../customization/graphql/base.type';
import { Exclude } from 'class-transformer';
import { UserNetworkTypeEnum } from './enums/user-network-type.enum';
import { IsUUID } from 'class-validator';
import { Vehicle } from '../vehicle/vehicle.entity';
import { IceVehicle } from '../vehicle/types/ice-vehicle.type';

const VehicleArrayReturn = () => [Vehicle];
const VehicleReturn = () => Vehicle;
const IceVehicleReturn = () => IceVehicle;

@Entity()
@ObjectType('User', { implements: [BaseType] })
export class User extends BaseType {
  @Field({ nullable: true })
  @Column()
  name?: string;

  @Field({ nullable: true })
  @Column()
  lastname?: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column()
  phone?: string;

  @Field({ nullable: true })
  @Column()
  phoneCountryCode?: string;

  @Field({ nullable: true })
  @Column()
  phoneCountry?: string;

  @Field({ nullable: true })
  @Exclude()
  @Column()
  password?: string;

  @Field({ nullable: true })
  @Column()
  username?: string;

  @Field({ nullable: true })
  @Column()
  dateOfBirth?: Date;

  @Field({ defaultValue: [UserRoleEnum.USER] })
  @Column()
  role: UserRoleEnum;

  @Field({ defaultValue: false })
  @Column()
  active: boolean;

  @Field({ nullable: true })
  @Exclude()
  @Column()
  recoveryPasswordToken?: string;

  @Field()
  @Exclude()
  @Column()
  networkType: UserNetworkTypeEnum;

  @Field({ nullable: true })
  @Column()
  avatarUrl?: string;

  @Field(VehicleArrayReturn, { defaultValue: [] })
  @IsUUID('4', { each: true })
  @Column()
  vehicles?: number[];

  @Field(VehicleReturn, { nullable: true })
  @IsUUID()
  @Column()
  selectedVehicle?: number;

  @Field({ nullable: true })
  @Column()
  random4digits?: number;

  @Field(IceVehicleReturn, { nullable: true })
  @Column()
  iceVehicle?: IceVehicle;

  @Field({ defaultValue: false })
  @Column()
  deleted: boolean;
}
