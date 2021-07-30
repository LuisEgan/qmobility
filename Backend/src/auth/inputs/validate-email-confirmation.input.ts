import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNumber } from 'class-validator';

@InputType()
export class ValidateEmailConfirmationInput {
  @Field(type => String)
  @IsEmail()
  email: string;

  @Field(type => Number)
  @IsNumber()
  random4digits: number;
}
