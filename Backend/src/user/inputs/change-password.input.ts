import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, Matches } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field(type => String)
  @IsUUID()
  userId: string;

  @Field(type => String)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&"[\];',./{}|":?><`~°¬¡¿´]{8,}$/,
    {
      message:
        'Must contain 8 characters, one number and one special character',
    },
  )
  password: string;
}
