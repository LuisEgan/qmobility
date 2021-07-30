import { Injectable, Logger } from '@nestjs/common';
import { MyRoute } from 'src/route/my-route.entity';
import { RouteService } from 'src/route/route.service';
import { User } from 'src/user/user.entity';
import { Stats } from './stats.entity';

const HOURS_IN_YEAR: number = 8760;

@Injectable()
export class StatsService {
  constructor(private readonly routeService: RouteService) {}

  async getMyStats(user: User): Promise<Stats> {
    const myStoredRoutes = await this.routeService.myRoutes(user);

    let myStats: Stats = {
      anualTotalMilles: 0,
      averageTripLength: 0,
      maxTripLength: 0,
      minTripLength: 0,
      totalTimeInCar: 0,
      idleTimeOfCar: 0,
      idlePercentageOfCar: 0,
      weeklyAverageMiles: 0,
      dailyAverageMiles: 0,
      minRangeRequirement: 0,
      maxRangeRequirement: 0,
      totalCo2Saved: 0,
      treesSaved: 0,
    };

    if (myStoredRoutes.length < 1) return myStats;

    const totalDistanceArray = myStoredRoutes.map(route =>
      this.routeService.kilometersToMiles(route.totalDistance * 0.001),
    );

    const anualTotalMilles: number = +myStoredRoutes
      .map(route => this.calculateTotalDistance(route))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(2);

    const allTripsAmount: number = myStoredRoutes
      .map(route => {
        const frequency: number = +route.frequency.split(' ')[0];
        return this.frequencyPeriodMultiplier(route.frequency) * frequency;
      })
      .reduce((prev, curr) => prev + curr, 0);

    const averageTripLength: number = +(
      anualTotalMilles /
      allTripsAmount /
      2
    ).toFixed(2);

    const maxTripLength: number = Math.max
      .apply(Math, totalDistanceArray)
      .toFixed(2);

    const minTripLength: number = Math.min
      .apply(Math, totalDistanceArray)
      .toFixed(2);

    // * Sum of all the durations of all the planned routes multiplied by their annual frequency then muliplied by 2, .
    let totalTimeInCar: number = +(
      myStoredRoutes
        .map(
          route =>
            this.secondsToHours(route.totalTime) *
            this.frequencyPeriodMultiplier(route.frequency),
        )
        .reduce((prev, curr) => prev + curr, 0) * 2
    ).toFixed(2);

    const idleTimeOfCar: number = +(HOURS_IN_YEAR - totalTimeInCar).toFixed(2);

    const idlePercentageOfCar: number =
      100 - +((totalTimeInCar * 100) / HOURS_IN_YEAR).toFixed(2);

    const weeklyAverageMiles: number = +(anualTotalMilles / 52).toFixed(2);

    const dailyAverageMiles: number = +(anualTotalMilles / 365).toFixed(2);

    // * At least 50, then either the Weekly avg /2 or 300 (whichever is smaller)
    const minRangeRequirement: number = +Math.min(
      300,
      Math.max(50, weeklyAverageMiles / 2),
    ).toFixed(2);

    // * longest trip or 350 (smaller)
    // * lowest possible value = Min range plus 75
    const maxRangeRequirement: number = +Math.max(
      minRangeRequirement + 75,
      Math.min(350, maxTripLength),
    ).toFixed(2);

    let totalCo2Saved: number = 0;

    let treesSaved: number = 0;

    // * to calculate c02 usage first we need to obtain the ice vehicle
    if (user.iceVehicle) {
      const c02consumption = user.iceVehicle.Co2Emissions || 0;
      totalCo2Saved = +(c02consumption * 1.6 * anualTotalMilles).toFixed(2);
      treesSaved = +(totalCo2Saved / 22).toFixed(2);
    } else {
      // * average
      totalCo2Saved = +(145 * 1.6 * anualTotalMilles).toFixed(2);
      treesSaved = +(totalCo2Saved / 22).toFixed(2);
    }

    myStats = {
      anualTotalMilles,
      averageTripLength,
      maxTripLength,
      minTripLength,
      totalTimeInCar,
      idleTimeOfCar,
      idlePercentageOfCar,
      weeklyAverageMiles,
      dailyAverageMiles,
      minRangeRequirement,
      maxRangeRequirement,
      totalCo2Saved,
      treesSaved,
    };

    return myStats;
  }

  private calculateTotalDistance(route: MyRoute): number {
    const frequency: number = +route.frequency.split(' ')[0];
    const frequencyPeriodMultiplier: number = this.frequencyPeriodMultiplier(
      route.frequency,
    );
    return (
      this.routeService.kilometersToMiles(route.totalDistance * 0.001) *
      frequencyPeriodMultiplier *
      frequency *
      2
    );
  }

  private secondsToHours(seconds: number): number {
    return +(seconds / 3600).toFixed(2);
  }

  private frequencyPeriodMultiplier(frequency: string): number {
    return frequency.toLocaleLowerCase().includes('year') ? 1 : 52;
  }
}
