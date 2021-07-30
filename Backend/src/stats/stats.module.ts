import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyRoute } from 'src/route/my-route.entity';
import { RecentRoutes } from 'src/route/recent-routes.entity';
import { RouteService } from 'src/route/route.service';
import { StatsResolver } from './stats.resolver';
import { StatsService } from './stats.service';

@Module({
  providers: [StatsService, RouteService, StatsResolver],
  imports: [
    TypeOrmModule.forFeature([MyRoute, RecentRoutes]),
    HttpModule.register({
      timeout: 30000,
    }),
  ],
})
export class StatsModule {}
