import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsEmail, IsUUID, Matches } from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserNetworkTypeEnum } from '../enums/user-network-type.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&"[\];',./{}|":?><`~°¬¡¿´]{8,}$/,
    {
      message:
        'Must contain 8 characters, one number and one special character',
    },
  )
  password?: string;

  @Field(() => String, { nullable: true })
  role?: UserRoleEnum;

  @Field(() => String, { nullable: true })
  active?: boolean;

  @Field(() => String, { nullable: true })
  networkType?: UserNetworkTypeEnum;
}
