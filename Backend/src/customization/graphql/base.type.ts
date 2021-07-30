import { Field, InterfaceType, ID } from '@nestjs/graphql';
import {
  ObjectIdColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@InterfaceType()
export abstract class BaseType {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field()
  @PrimaryColumn()
  id: string;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  @CreateDateColumn({ nullable: true })
  createAt?: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt?: Date;
}
