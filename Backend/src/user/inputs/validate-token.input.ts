import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class ValidateTokenInput {
  @Field()
  @IsUUID()
  userId: string;

  @Field()
  token: string;
}
