import { Field, ObjectType } from '@nestjs/graphql';

// * annual total Miles
// * avg trip length
// * max trip length
// * min trip length (miles)
// * total time in car (hours)
// * idle time of car (hours)
// * idle % of car
// * weekly Avg Miles
// * daily avg (miles)
// * range requirement (min)
// * range requirement (max)
// * total c02 saved
// * trees saved

@ObjectType()
export class Stats {
  @Field()
  anualTotalMilles: number;

  @Field()
  averageTripLength: number;

  @Field()
  maxTripLength: number;

  @Field()
  minTripLength: number;

  @Field()
  totalTimeInCar: number;

  @Field()
  idleTimeOfCar: number;

  @Field()
  idlePercentageOfCar: number;

  @Field()
  weeklyAverageMiles: number;

  @Field()
  dailyAverageMiles: number;

  @Field()
  minRangeRequirement: number;

  @Field()
  maxRangeRequirement: number;

  @Field()
  totalCo2Saved: number;

  @Field()
  treesSaved: number;
}
