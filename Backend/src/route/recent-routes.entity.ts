import { MyRoute } from './my-route.entity';
import { Entity } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class RecentRoutes extends MyRoute {}
