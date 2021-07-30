import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, IsDate } from 'class-validator';
import { IceVehicle } from '../../vehicle/types/ice-vehicle.type';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  @MinLength(1)
  name?: string;

  @Field(() => String, { nullable: true })
  @MinLength(1)
  lastname?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  phoneCountryCode?: string;

  @Field({ nullable: true })
  phoneCountry?: string;

  @Field(() => String, { nullable: true })
  @MinLength(1)
  username?: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  dateOfBirth?: Date;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => Number, { nullable: true })
  selectedVehicle?: number;

  @Field(() => IceVehicle, { nullable: true })
  iceVehicle?: IceVehicle;
}
