import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useTransition, mix } from "react-native-redash";
import Animated from "react-native-reanimated";
import { useLazyQuery, useQuery } from "@apollo/client";
import RouteDestination from "./RouteDestination";
import { BottomDrawer, Icons, Button, Card, Map } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { RoutePointsList } from "../../../components/Lists";
import { TMapSearchDoneNavProps } from "../../../navigation/Types/NavPropsTypes";

import { Route, User } from "../../../gql";
import {
  IChargers,
  IGetRouter,
  IGetRouterVar,
} from "../../../gql/Route/queries";

import ModalSaveRoute from "./ModalSaveRoute";
import ModalChangeLoading from "./ModalChangeLoading";
import { IEditChangeRoute } from "../../../components/SearchEditRouter/index";
import { kmToMiles } from "../../../lib/numbers";
import { IUser } from "../../../gql/User/Types";
import { IRouterPointsListItem } from "../../../components/Lists/RoutePointsList/RouterPointsListItem";

const { height, width } = Dimensions.get("window");

type IMapSearchDone = TMapSearchDoneNavProps;

const editNameCity = (nameCity: string): string => {
  if (nameCity.includes(".")) {
    return "Current location";
  }
  return nameCity;
};

const MapSearchDone = (props: IMapSearchDone) => {
  const { route } = props;

  const [getRoutes, { loading: loadingRoute, data: dataRoute }] = useLazyQuery<
    IGetRouter | undefined,
    IGetRouterVar
  >(Route.queries.getRoutes);

  const { data: allUserInfo } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [startDirection, setStartDirection] = useState<string>(
    route.params.origin,
  );
  const [endDirection, setEndDirection] = useState<string>(
    route.params.destination,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const [stateModal, setStateModal] = useState<boolean>(false);

  const transition = useTransition(isDrawerOpen, { duration: 100 });
  const translateY = mix(transition, 0, -200);

  // * Get route with Car ID
  useEffect(() => {
    if (allUserInfo) {
      getRoutes({
        variables: {
          origin: route.params.origin,
          destination: route.params.destination,
          car_id: allUserInfo.user.selectedVehicle?.Vehicle_ID || 0,
          car_charge: 80,
        },
      });
    }
  }, [allUserInfo]);

  const onReverseRoute = () => {
    const origin = endDirection;
    const destination = startDirection;

    setEndDirection(destination || "");
    setStartDirection(origin || "");

    getRoutes({
      variables: {
        origin,
        destination,
        car_id: allUserInfo?.user?.selectedVehicle?.Vehicle_ID || 0,
        car_charge: 80,
      },
    });
  };

  const onEditRoute = ({ str, type }: IEditChangeRoute) => {
    const startTmp = startDirection || route.params.origin;
    const endTmp = endDirection || route.params.destination;

    if (type === "START") setStartDirection(str);
    if (type === "END") setEndDirection(str);

    const start = type === "START" ? str : startTmp;
    const end = type === "END" ? str : endTmp;

    getRoutes({
      variables: {
        origin: start,
        destination: end,
        car_id: allUserInfo?.user?.selectedVehicle?.Vehicle_ID || 0,
        car_charge: 80,
      },
    });
  };

  const RouteActions = () => (
    <>
      {loadingRoute ? (
        <View
          style={{
            marginVertical: 50,
          }}
        >
          <ActivityIndicator color={theme.colors.primary} />
          <Text variant="bodyHighlight" style={styles.textLoading}>
            Loading...
          </Text>
        </View>
      ) : (
        <View
          style={{
            height: height * 0.3,
          }}
        >
          <View
            style={{
              flex: Platform.OS === "ios" ? 0.3 : 0.5,
              justifyContent: "center",
            }}
          >
            <Text variant="heading2" numberOfLines={1}>
              {`${startDirection && editNameCity(startDirection)}, ${
                endDirection && editNameCity(endDirection)
              }`}
            </Text>
          </View>

          <View
            style={[
              styles.row,
              {
                flex: Platform.OS === "ios" ? 0.2 : 0.4,
                width: "100%",
                alignItems: "center",
              },
            ]}
          >
            <Icons
              icon="Market"
              size={20}
              fill={theme.colors.grayLight}
              containerStyle={styles.icon}
            />
            <Text variant="bodySmall" numberOfLines={1}>
              {`${startDirection && editNameCity(startDirection)}, ${
                endDirection && editNameCity(endDirection)
              }`}
            </Text>
          </View>

          <View
            style={[
              styles.row,
              {
                flex: Platform.OS === "ios" ? 0.2 : 0.4,

                width: "100%",
                alignItems: "center",
              },
            ]}
          >
            <Icons
              icon="DirectionsCar"
              size={20}
              fill={theme.colors.grayLight}
              containerStyle={styles.icon}
            />
            <Text variant="bodySmall">
              {`${new Date((dataRoute?.getRoutes?.Route?.Time || 0) * 1000)
                .toISOString()
                .substr(11, 5)} (${routeDistance} mi)`}
            </Text>
            <Icons
              icon="BatteryRight"
              size={20}
              fill={theme.colors.grayLight}
              containerStyle={[styles.icon, { marginLeft: 10 }]}
            />
            <Text variant="bodySmall">
              {`${Math.ceil(dataRoute?.getRoutes?.Route?.Total_kWh || 0)}kWh`}
            </Text>
          </View>

          <View
            style={[
              {
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-around",
              },
            ]}
          >
            <Button
              containerStyle={styles.button}
              variant="primary"
              inverse
              label="STEPS"
              onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            />
            <Button
              containerStyle={styles.button}
              variant="primary"
              label="SAVE ROUTE"
              onPress={() => setStateModal(!stateModal)}
            />
          </View>
        </View>
      )}
    </>
  );

  const routeDistance = kmToMiles(
    (dataRoute?.getRoutes?.Route?.Distance || 0) / 1000,
  );

  return (
    <>
      <ModalSaveRoute
        stateModal={stateModal}
        startLocation={startDirection}
        endLocation={endDirection}
        onClosed={() => setStateModal(!stateModal)}
        kwh={dataRoute?.getRoutes?.Route?.Total_kWh || 0}
        totalDistance={dataRoute?.getRoutes?.Route?.Distance || 0}
        totalTime={dataRoute?.getRoutes?.Route?.Time || 0}
        carId={allUserInfo?.user?.selectedVehicle?.Vehicle_ID || 0}
      />

      <ModalChangeLoading stateModal={loadingRoute} />

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.headerContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <RouteDestination
            startDireccion={
              (startDirection && editNameCity(startDirection)) || ""
            }
            endDireccion={(endDirection && editNameCity(endDirection)) || ""}
            containerStyle={styles.routeDestination}
            onReverseRoute={onReverseRoute}
            onEditNewRoute={onEditRoute}
          />
        </Animated.View>

        <View style={styles.mapContainer}>
          <Map
            initialLocation={route.params.initialLocation}
            routeCoords={dataRoute?.getRoutes?.Route?.Route_Coords}
            chargers={
              dataRoute?.getRoutes?.Chargers
              && (dataRoute?.getRoutes?.Chargers.map(
                (charger) => charger[0],
              ) as IChargers[])
            }
          />
        </View>

        <BottomDrawer
          maxHeight={height * 0.9}
          closeOffset={height * 0.35}
          isOpen={isDrawerOpen}
          scrollable={false}
          disableToggler
          onOpen={() => {
            setTimeout(() => {
              setShowContent(true);
            }, 0);
          }}
          onClose={() => setShowContent(false)}
        >
          <RouteActions />
          {showContent && (
            <View
              style={{
                height: height * (Platform.OS === "ios" ? 0.55 : 0.54),
              }}
            >
              <RoutePointsList
                startLocation={startDirection}
                endLocation={endDirection}
                points={
                  dataRoute?.getRoutes?.Chargers
                  && (dataRoute?.getRoutes?.Chargers.map(
                    (charger) => charger[0],
                  ) as IRouterPointsListItem[])
                }
              />

              <View style={styles.cardsContainer}>
                <Card
                  title={`${Math.ceil(
                    dataRoute?.getRoutes?.Route?.Total_kWh || 0,
                  )}kWh`}
                  subTitle="Energy"
                  containerStyle={styles.card}
                />
                <Card
                  title={`${new Date(
                    (dataRoute?.getRoutes?.Route?.Time || 0) * 1000,
                  )
                    .toISOString()
                    .substr(11, 5)}`}
                  subTitle="Time"
                  containerStyle={[styles.card]}
                  contentStyle={{ backgroundColor: theme.colors.primary }}
                />
                <Card
                  title={`${routeDistance} mi`}
                  subTitle="Distance"
                  containerStyle={[styles.card, styles.lastCard]}
                  contentStyle={{
                    backgroundColor: theme.colors.cardsBackground,
                  }}
                  textColor="heading2"
                />
              </View>
            </View>
          )}
        </BottomDrawer>
      </View>
    </>
  );
};

export default MapSearchDone;

const styles = StyleSheet.create({
  container: {
    height,
  },
  contentLoading: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    width: "70%",
    marginVertical: 2,
  },
  icon: { marginRight: 10 },
  button: { width: "45%", height: 40 },
  headerContainer: {
    position: "relative",
    top: 0,
    width,
    height: height * 0.25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    backgroundColor: theme.colors.headerBackground,
  },
  routeDestination: {
    marginTop: 20,
    elevation: 1,
  },
  mapContainer: {
    flex: 0.54,
  },
  cardsContainer: {
    flex: Platform.OS === "ios" ? 0.2 : 0.4,
    flexDirection: "row",
    marginVertical: "5%",
  },
  card: {
    flex: 1,
    paddingRight: 5,
  },
  lastCard: {
    paddingRight: 0,
  },
  textLoading: {
    textAlign: "center",
    marginVertical: "5%",
  },
});
