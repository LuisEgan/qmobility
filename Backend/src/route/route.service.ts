import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { GetRouteInput } from './inputs/get-route.input';
import { Routes } from './routes.type';
import { plainToClass } from 'class-transformer';
import { SaveMyRouteInput } from './inputs/save-route.input';
import { MyRoute } from './my-route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RecentRoutes } from './recent-routes.entity';
import { v4 as uuid } from 'uuid';
import * as config from 'config';
import { UpdateMyRouteInput } from './inputs/update-route.input';

const qMobilityLegacyApiConfig = config.get('qMobility');

@Injectable()
export class RouteService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(MyRoute)
    private readonly myRouteRepository: Repository<MyRoute>,
    @InjectRepository(RecentRoutes)
    private readonly myRecentRoutesRepository: MongoRepository<RecentRoutes>,
  ) {}

  async getRoute(getRouteInput: GetRouteInput, user: User): Promise<Routes> {
    const qs = Object.keys(getRouteInput)
      .map(
        key =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            getRouteInput[key],
          )}`,
      )
      .join('&');

    const url = `${process.env.QMOBILITY_API_URL ||
      qMobilityLegacyApiConfig.routesApiUrl}?${qs}`;

    const getRoutes = await this.httpService.get(url).toPromise();
    const routes: Routes = plainToClass(Routes, getRoutes.data);

    // * store my-recent-route
    const recentRoute: RecentRoutes = this.myRecentRoutesRepository.create({
      id: uuid(),
      ...getRouteInput,
      userId: user.id,
      kwh: routes?.Route?.Total_kWh,
      totalDistance: routes?.Route?.Distance,
      totalTime: routes?.Route?.Time,
      carId: getRouteInput?.car_id,
    });

    await this.myRecentRoutesRepository.save(recentRoute);

    return routes;
  }

  async saveMyRoute(
    saveMyRouteInput: SaveMyRouteInput,
    user: User,
  ): Promise<MyRoute> {
    const myRoute: MyRoute = this.myRouteRepository.create({
      ...saveMyRouteInput,
      userId: user.id,
      id: uuid(),
    });

    return this.myRouteRepository.save(myRoute);
  }

  async updateMyRoute(
    updateMyRouteInput: UpdateMyRouteInput,
  ): Promise<MyRoute> {
    const storedRoute = await this.myRouteRepository.findOne({
      id: updateMyRouteInput.myRouteId,
    });
    if (!storedRoute)
      throw new BadRequestException(
        `there no route with id ${updateMyRouteInput.myRouteId}`,
      );

    return this.myRouteRepository.save({
      ...storedRoute,
      ...updateMyRouteInput,
    });
  }

  async deleteMyRoute(id: string): Promise<boolean> {
    const storedRoute = await this.myRouteRepository.findOne({ id });

    if (!storedRoute)
      throw new BadRequestException(`there's no route with id ${id}`);

    this.myRouteRepository.delete({ id });
    return true;
  }

  async myRoutes(user: User): Promise<MyRoute[]> {
    return this.myRouteRepository.find({ userId: user.id });
  }

  async getMyRecentRoutes(limit: number, user: User): Promise<RecentRoutes[]> {
    return this.myRecentRoutesRepository.find({
      where: { $query: { userId: user.id } },
      take: limit,
      order: { createAt: -1 },
    });
  }

  kilometersToMiles(kilometers: number): number {
    const factor = 0.621371;
    return kilometers * factor;
  }
}
