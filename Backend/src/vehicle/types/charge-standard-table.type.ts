import { Field, ObjectType } from '@nestjs/graphql';
import {
  _230V10A1X,
  _230V16A1X,
  _230V32A1X,
  _230V16A3X,
  _230V32A3X,
} from './charge-standard.type';

@ObjectType()
export class ChargeStandardTable {
  @Field()
  _230V10A1X: _230V10A1X;

  @Field()
  _230V16A1X: _230V16A1X;

  @Field()
  _230V32A1X: _230V32A1X;

  @Field()
  _230V16A3X: _230V16A3X;

  @Field()
  _230V32A3X: _230V32A3X;
}
