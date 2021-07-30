import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ChangePasswordRequestInput {
  @Field(() => String)
  @IsEmail()
  email: string;
}
