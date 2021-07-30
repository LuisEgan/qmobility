import { BaseType } from '../customization/graphql/base.type';
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { IsUUID } from 'class-validator';

@ObjectType('MyRoute', { implements: [BaseType] })
@Entity()
export class MyRoute extends BaseType {
  @Field()
  @Column()
  origin: string;

  @Field()
  @Column()
  destination: string;

  @Field()
  @Column()
  @IsUUID()
  userId: string;

  @Field()
  @Column()
  friendlyName: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  frequency: string;

  @Field({ nullable: true })
  @Column()
  kwh?: number;

  @Field({ nullable: true })
  @Column()
  totalDistance?: number;

  @Field({ nullable: true })
  @Column()
  totalTime?: number;

  @Field({ nullable: true })
  @Column()
  carId: number;
}
