import { Injectable, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ChargerDevice } from './charger-device.entity';
import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import * as config from 'config';
import { Point } from 'geojson';

const qMobilityConfig = config.get('qMobility');

@Injectable()
export class ChargerService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ChargerDevice)
    private readonly chargerDeviceRepository: MongoRepository<ChargerDevice>,
  ) {}

  async getAllChargers(): Promise<ChargerDevice[]> {
    return this.chargerDeviceRepository.find({});
  }

  async getCharger(id: string): Promise<ChargerDevice> {
    return this.chargerDeviceRepository.findOne({ id });
  }

  async getNearestCharger(
    longitude: number,
    latitude: number,
    distance: number,
  ): Promise<ChargerDevice[]> {
    return this.chargerDeviceRepository.find({
      Location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $minDistance: 1,
          $maxDistance: distance,
        },
      },
    });
  }
}
