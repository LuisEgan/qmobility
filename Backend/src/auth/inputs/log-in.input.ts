import { IsEmail, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(6)
  password: string;
}
