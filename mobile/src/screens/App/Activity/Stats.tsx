import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { TextWithUnit, TriCard } from "../../../components";
import theme from "../../../config/Theme";
import { IMyStats } from "../../../gql/User/queries";

interface IStats {
  stats?: IMyStats;
}

const Stats = (props: IStats) => {
  const { stats } = props;

  return (
    <ScrollView style={styles.container}>
      <TriCard
        col1={{
          icon: "Bubble",
          title: (
            <TextWithUnit
              text={`${stats?.anualTotalMilles}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
          subTitle: "Total miles",
        }}
        col2={{
          icon: "ArrowUpLight",
          title: (
            <TextWithUnit
              text={`${stats?.averageTripLength}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
          subTitle: "Avg trip length",
        }}
        col3={{
          icon: "Clock",
          title: (
            <TextWithUnit
              text={`${stats?.maxTripLength}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
          subTitle: "Max. trip length",
        }}
      />

      <TriCard
        col1={{
          icon: "CarMinTripLength",
          subTitle: "Min. trip length",
          title: (
            <TextWithUnit
              text={`${stats?.minTripLength}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col2={{
          icon: "CarMinRange",
          subTitle: "Min Range req.",
          title: (
            <TextWithUnit
              text={`${stats?.minRangeRequirement}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col3={{
          icon: "CarMaxRange",
          subTitle: "Max Range req.",
          title: (
            <TextWithUnit
              text={`${stats?.maxRangeRequirement}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
      />

      <TriCard
        col1={{
          icon: "CarTimeIn",
          title: (
            <TextWithUnit
              text={`${stats?.totalTimeInCar}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="h"
            />
          ),
          subTitle: "Time in car",
        }}
        col2={{
          icon: "CarIdleTimeIn",
          title: (
            <TextWithUnit
              text={`${stats?.idleTimeOfCar}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="h"
            />
          ),
          subTitle: "Car idle time",
        }}
        col3={{
          icon: "CarIdle",
          title: (
            <TextWithUnit
              text={`${stats?.idlePercentageOfCar}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="%"
            />
          ),
          subTitle: "Idle %",
        }}
      />

      <TriCard
        col1={{
          icon: "CarWeeklyAvg",
          subTitle: "Weekly Avg.",
          title: (
            <TextWithUnit
              text={`${stats?.weeklyAverageMiles}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col2={{
          icon: "CarDialyAvg",
          subTitle: "Daily Avg.",
          title: (
            <TextWithUnit
              text={`${stats?.dailyAverageMiles}`}
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
      />
    </ScrollView>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
});
