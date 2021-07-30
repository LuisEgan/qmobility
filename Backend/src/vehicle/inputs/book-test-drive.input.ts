import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class BookTestDriveInput {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  carId: number;
}
