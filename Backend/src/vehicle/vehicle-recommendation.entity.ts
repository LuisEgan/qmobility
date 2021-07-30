import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from '../customization/graphql/base.type';
import { Entity, Column } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@ObjectType('VehicleRecommendation', { implements: [BaseType] })
@Entity()
export class VehicleRecommendation extends BaseType {
  @Field(() => Vehicle)
  @Column()
  vehicle: number;

  @Field(() => String)
  @Column()
  make: string;

  @Field(() => String)
  @Column()
  makeModel: string;

  @Field(() => String)
  @Column()
  category: string;
}
