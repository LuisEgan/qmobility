import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { VehicleSearchInput } from './inputs/vehicle-search-input';
import * as config from 'config';
import { IceVehicle } from './types/ice-vehicle.type';
import { PlateAPIResponse } from './types/plate-api.type';
import { User } from '../user/user.entity';
import { VehicleRecommendation } from './vehicle-recommendation.entity';
import { VehicleCategoryEnum } from './enums/vehicle-category.enum';
import { CommonService } from '../common/common.service';
import { SendEmailDto, Tos } from '../common/dto/send-email.dto';
import { VehicleByMakesAndModelsInput } from './inputs/vehicle-makes-models.input';
import { VehicleModelsInput } from './inputs/vehicle-models.input';
import { BookTestDriveInput } from './inputs/book-test-drive.input';
import { UserInputError } from 'apollo-server-express';

const qMobilityConfig = config.get('qMobility');
const emailTemplate = config.get('emailTemplate');

@Injectable()
export class VehicleService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleRecommendation)
    private readonly vehicleRecommendationRepository: Repository<
      VehicleRecommendation
    >,
    private readonly commonService: CommonService,
  ) {}

  milesToKilometers(miles: number): number {
    const factor = 0.621371;
    return miles / factor;
  }

  async getVehicle(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne({ Vehicle_ID: id });
  }

  async getVehicles({
    Vehicle_Model,
    Vehicle_Make,
    minPrice,
    maxPrice,
    limit,
    skip,
    seats,
    bodyType,
    rangeMin,
    rangeMax,
  }: VehicleSearchInput): Promise<Vehicle[]> {
    let filter = [];

    if (Vehicle_Model) {
      filter.push({ Vehicle_Model });
    }

    if (Vehicle_Make) {
      filter.push({ Vehicle_Make });
    }

    if (minPrice) {
      filter.push({ Price_From_UK: { $gte: minPrice } });
    }

    if (maxPrice) {
      filter.push({ Price_From_UK: { $lte: maxPrice } });
    }

    if (rangeMin) {
      filter.push({ Range_Real: { $gte: this.milesToKilometers(rangeMin) } });
    }

    if (rangeMax) {
      filter.push({ Range_Real: { $lte: this.milesToKilometers(rangeMax) } });
    }

    if (seats) {
      filter.push({ Misc_Seats: { $in: seats } });
    }

    if (bodyType) {
      filter.push({ Misc_Body: { $in: bodyType } });
    }

    const query: FindManyOptions = { where: { $and: filter } };

    if (limit) {
      query.take = limit;
    }

    if (skip) {
      query.skip = skip;
    }

    if (!filter.length) {
      delete query.where;
    }

    return this.vehicleRepository.find(query);
  }

  async getVehicleByMakesAndModels(
    vehicleByMakesAndModelInput: VehicleByMakesAndModelsInput,
  ): Promise<Vehicle[]> {
    const { makes, models, limit, skip } = vehicleByMakesAndModelInput;

    let filter: FindManyOptions = { where: {} };

    if (models) {
      filter.where['Vehicle_Model'] = { $in: models };
    }

    if (makes) {
      filter.where['Vehicle_Make'] = { $in: makes };
    }

    if (skip) {
      filter.skip = skip;
    }

    if (limit) {
      filter.take = limit;
    }

    return this.vehicleRepository.find(filter);
  }

  async getManyVehicles(vehicleIds: number[]): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      where: { Vehicle_ID: { $in: vehicleIds } },
    });
  }

  async getVehicleModels({ makes }: VehicleModelsInput): Promise<string[]> {
    const vehicles = await this.vehicleRepository.find({
      where: { Vehicle_Make: { $in: makes } },
    });

    const models = vehicles.map(vehicle => {
      return vehicle.Vehicle_Model;
    });

    return [...new Set(models)];
  }

  async getVehicleMakes(): Promise<string[]> {
    const vehicles = await this.vehicleRepository.find({});

    const makes = vehicles.map(vehicle => {
      return vehicle.Vehicle_Make;
    });

    return [...new Set(makes)];
  }

  async getVehicleBodyTypes(): Promise<string[]> {
    const vehicles = await this.vehicleRepository.find({});

    const bodyTypes = vehicles.map(vehicle => {
      return vehicle.Misc_Body;
    });

    return [...new Set(bodyTypes)];
  }

  async vehicleRecommendations(
    category: VehicleCategoryEnum,
  ): Promise<VehicleRecommendation[]> {
    if (!category) return this.vehicleRecommendationRepository.find({});
    return this.vehicleRecommendationRepository.find({ category });
  }

  async bookTestDrive(user: User): Promise<boolean> {
    const selectedVehicle = await this.vehicleRepository.findOne({
      Vehicle_ID: user.selectedVehicle,
    });

    if (!selectedVehicle)
      throw new BadRequestException(
        `the user doesn't have selected any vehicle`,
      );

    const dynamic_template_data = {
      username: user.name,
      email: user.email,
      vehicle: `${selectedVehicle.Vehicle_Make} ${selectedVehicle.Vehicle_Model}`,
    };

    const sendEmailDto: SendEmailDto = {
      to: [
        new Tos(
          process.env.TEST_DRIVE_EMAIL || emailTemplate.qMobilityTestDriveEmail,
          'Test Drive',
        ),
      ],
      dynamic_template_data,
      templateId: emailTemplate.qRequestForATestDriveTemplate,
    };

    this.commonService.sendEmail(sendEmailDto);

    return true;
  }

  async bookTestDriveCatalog({
    carId,
    email,
    name,
  }: BookTestDriveInput): Promise<boolean> {
    const selectedVehicle = await this.vehicleRepository.findOne({
      Vehicle_ID: carId,
    });

    if (!selectedVehicle)
      throw new UserInputError(`the user doesn't have selected any vehicle`);

    const dynamic_template_data = {
      username: name,
      email: email,
      vehicle: `${selectedVehicle.Vehicle_Make} ${selectedVehicle.Vehicle_Model}`,
    };

    const sendEmailDto: SendEmailDto = {
      to: [
        new Tos(
          process.env.TEST_DRIVE_EMAIL || emailTemplate.qMobilityTestDriveEmail,
          'Test Drive',
        ),
      ],
      dynamic_template_data,
      templateId: emailTemplate.qRequestForATestDriveTemplate,
    };

    this.commonService.sendEmail(sendEmailDto);

    return true;
  }

  async searchIceVehicle(plate: string): Promise<IceVehicle | null> {
    const { data } = await this.httpService
      .get(
        `${qMobilityConfig.platesApiUrl}&api_nullitems=0&auth_apikey=${process
          .env.PLATE_API_KEY || qMobilityConfig.platesApiKey}&key_VRM=${plate}`,
      )
      .toPromise();

    if (data.Response.StatusCode !== 'Success')
      throw new BadRequestException(data.Response.StatusMessage);

    const mappedPlateResult = plainToClass(PlateAPIResponse, data);
    const dataItem = mappedPlateResult?.Response?.DataItems;

    const {
      Make,
      MakeModel,
      Co2Emissions,
      Colour,
      FuelType,
      SeatingCapacity,
      VehicleClass,
      YearMonthFirstRegistered,
      DoorPlanLiteral,
      EngineCapacity,
    } = dataItem?.VehicleRegistration;

    const { Kph, Mph } = dataItem.TechnicalDetails?.Performance?.MaxSpeed;

    const { ModelVariant } = dataItem?.SmmtDetails;

    const iceVehicle: IceVehicle = {
      Make,
      MakeModel,
      Co2Emissions,
      Colour,
      FuelType,
      SeatingCapacity,
      VehicleClass,
      YearMonthFirstRegistered,
      DoorPlanLiteral,
      EngineCapacity,
      ModelVariant,
      MaxSpeedKph: Kph || 0,
      MaxSpeedMph: Mph || 0,
      VehiclePlate: plate,
    };

    return iceVehicle;
  }
}
