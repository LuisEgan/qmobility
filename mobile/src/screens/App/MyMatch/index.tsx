import { useLazyQuery, useQuery } from "@apollo/client";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CarCard, Header } from "../../../components";
import { DrawerLeftMenu } from "../../../components/HOCs";
import theme, { Text } from "../../../config/Theme";
import { User } from "../../../gql";
import { IMyStats } from "../../../gql/User/queries";
import Vehicle from "../../../gql/Vehicle";
import { IGetVehiclesVars } from "../../../gql/Vehicle/queries";
import { IVehicle } from "../../../gql/Vehicle/Types";
import {
  APP_STACK_SCREENS_NAMES,
  LIMIT_MAX,
  RANGE_MAX,
  RANGE_MIN,
} from "../../../lib/constants";
import ModalChangeLoading from "../MapSearchDone/ModalChangeLoading";

import Card from "./Card";
import Filter from "./Filter";

const { height, width } = Dimensions.get("window");

const MyMatch = () => {
  const { navigate } = useNavigation();

  const [
    getVehicles,
    { data: eVes, loading: getVehiclesLoading },
  ] = useLazyQuery<{ vehicles: IVehicle[] }, IGetVehiclesVars>(
    Vehicle.queries.getVehicles,
  );

  const { data: getMyStatsData, loading: getMyStatsLoading } = useQuery<{
    getMyStats: IMyStats;
  }>(User.queries.getMyStats);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [rangeMin, setRangeMin] = useState<number>(RANGE_MIN);
  const [rangeMax, setRangeMax] = useState<number>(RANGE_MAX);
  const [limitMax, setLimitMax] = useState<number>(LIMIT_MAX);

  useFocusEffect(
    useCallback(
      () => () => {
        if (getMyStatsData) {
          setRangeMin(getMyStatsData.getMyStats.minRangeRequirement);
          setRangeMax(getMyStatsData.getMyStats.maxRangeRequirement);
        }
      },
      [],
    ),
  );

  useEffect(() => {
    if (getMyStatsData && rangeMin && rangeMax) {
      getVehicles({
        variables: {
          rangeMin,
          rangeMax,
          limit: LIMIT_MAX,
        },
      });
    }
  }, [getMyStatsData, rangeMin, rangeMax]);

  useEffect(() => {
    if (getMyStatsData) {
      setRangeMin(getMyStatsData.getMyStats.minRangeRequirement || RANGE_MIN);
      setRangeMax(getMyStatsData.getMyStats.maxRangeRequirement || RANGE_MAX);
    }
  }, [getMyStatsData]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <ModalChangeLoading
        stateModal={getVehiclesLoading || getMyStatsLoading}
      />

      <Filter
        show={showFilter}
        setShowFilter={(show) => setShowFilter(show)}
        getVehicles={getVehicles}
        onCancel={() => setShowFilter(false)}
        onRangeMinChange={setRangeMin}
        onRangeMaxChange={setRangeMax}
        onLimitChange={setLimitMax}
        initMin={rangeMin}
        initMax={rangeMax}
        limitMax={limitMax}
      />

      <ScrollView style={styles.container}>
        <Header
          title="My Match"
          containerStyle={styles.header}
          icon="Menu"
          onPress={toggleDrawer}
        />

        <View style={styles.content}>
          <View
            style={{
              paddingHorizontal: "3%",
            }}
          >
            <Card {...{ rangeMin, rangeMax, setShowFilter }} />
          </View>

          <ScrollView
            horizontal
            style={[styles.scrollViewContainer, styles.scrollView]}
            snapToAlignment="center"
            snapToInterval={width}
            decelerationRate={0}
            showsHorizontalScrollIndicator={false}
          >
            {!!(
              !eVes?.vehicles.length
              && !(getVehiclesLoading || getMyStatsLoading)
            ) && (
              <View style={styles.errorCard}>
                <Text style={styles.errorText}>0 cars found</Text>
              </View>
            )}
            {eVes?.vehicles.map((e) => (
              <CarCard
                key={e.Vehicle_ID}
                eVe={e}
                onPressPrimary={() =>
                  navigate(APP_STACK_SCREENS_NAMES.Details, {
                    vehicleID: e.Vehicle_ID,
                  })}
                containerStyle={[
                  styles.scrollView,
                  styles.card,
                  {
                    width,
                    paddingHorizontal: width * 0.03,
                  },
                ]}
                contentStyle={styles.cardContent}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </DrawerLeftMenu>
  );
};

export default MyMatch;

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.white,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    // paddingHorizontal: width * 0.05,
    paddingBottom: 80,
    paddingTop: 20,
  },
  scrollViewContainer: {},
  scrollView: {
    // width: width * 0.9,
    height: height * 0.55,
  },
  card: {
    // padding: 10,
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  errorCard: {
    flex: 1,
    width,
    justifyContent: "center",
  },
  errorText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
