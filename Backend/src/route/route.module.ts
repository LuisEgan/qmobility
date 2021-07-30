import { Module, HttpModule } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteResolver } from './route.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyRoute } from './my-route.entity';
import { RecentRoutes } from './recent-routes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MyRoute, RecentRoutes]),
    HttpModule.register({
      timeout: 30000,
    }),
  ],
  providers: [RouteService, RouteService, RouteResolver],
})
export class RouteModule {}
