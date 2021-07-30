import { Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
export class JwtPayloadType {
  @IsUUID()
  @Field(type => String)
  id: string;

  @Field(type => String)
  role: string;
}
