import { registerEnumType } from '@nestjs/graphql';

export enum UserNetworkTypeEnum {
  QMOBILITY = 'QMOBILITY',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
  LINKEDIN = 'LINKEDIN',
}

registerEnumType(UserNetworkTypeEnum, {
  name: 'UserNetworkTypeEnum',
  description:
    'UserNetworkTypeEnum represent the type of sign up it can be QMOBILITY, FACEBOOK, GOOGLE, APPLE or LINKEDIN',
});
