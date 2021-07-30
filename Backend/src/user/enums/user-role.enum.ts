import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
  description:
    'UserRoleEnum represent the role of the user it can be USER or ADMIN',
});
