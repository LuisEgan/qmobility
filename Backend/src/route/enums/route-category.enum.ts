import { registerEnumType } from '@nestjs/graphql';

export enum RouteCategoryEnum {
  COMMUTE = 'COMMUTE',
  LOCAL_HOUSEHOLD_RUN = 'LOCAL_HOUSEHOLD_RUN',
  WEEKEND_AWAY = 'WEEKEND_AWAY',
  ANUAL_BREAK = 'ANUAL_BREAK',
}

registerEnumType(RouteCategoryEnum, {
  name: 'RouteCategoryEnum',
  description:
    'RouteCategoryEnum represent the categories COMMUTE, LOCAL_HOUSEHOLD_RUN, WEEKEND_AWAY or ANUAL_BREAK',
});
