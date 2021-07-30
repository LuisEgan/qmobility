import { registerEnumType } from '@nestjs/graphql';

export enum VehicleCategoryEnum {
  LUXURY = 'LUXURY',
  FAMILY = 'FAMILY',
  URBAN = 'URBAN',
  SPORTY = 'SPORTY',
}

registerEnumType(VehicleCategoryEnum, {
  name: 'VehicleCategoryEnum',
  description:
    'VehicleCategoryEnum represent the category of the cars that can be recommended for EVE',
});
