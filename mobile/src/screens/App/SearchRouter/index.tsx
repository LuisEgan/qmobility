import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { Card, ListItem, GoogleSearch, Modal } from "../../../components";
import theme, { Text } from "../../../config/Theme";

import ListTest from "./ListTest";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import {
  IGetRouterRecent,
  IGetRouterRecentVar,
} from "../../../gql/RecentRoute/queries";
import { RecentRoute } from "../../../gql";

import app from "../../../../app.json";
import { IDetails } from "../../../components/GoogleSearch";

const { height } = Dimensions.get("window");

const API_KEY = app.expo.android.config.googleMaps.apiKey;

const SearchRouter = () => {
  const [search, setSearch] = useState<string>("");
  const [stateModal, setStateModal] = useState<boolean>(false);

  const { navigate } = useNavigation();

  const { loading, data: dataRecent, error: errorLoading } = useQuery<
    IGetRouterRecent,
    IGetRouterRecentVar
  >(RecentRoute.queries.getMyRecentRoutes, {
    variables: {
      limit: 20,
    },
  });

  const onRoute = (details: { origin?: string; destination?: string }) => {
    navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
      origin: details?.origin || "",
      destination: details?.destination || "",
    });
  };

  const History = () => (
    <>
      <View style={styles.contentCard}>
        {ListTest.listFavorite
          && ListTest.listFavorite.map((place) => (
            <Card key={`${place.title}_${Math.random()}`} {...place} />
          ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.text} variant="label">
          RECENT
        </Text>
      </View>

      <View style={styles.containerScroll}>
        {loading ? (
          <View
            style={{
              marginVertical: 50,
            }}
          >
            <ActivityIndicator color={theme.colors.primary} />
            <Text
              variant="bodyHighlight"
              style={{
                textAlign: "center",
                marginVertical: "5%",
              }}
            >
              Loading...
            </Text>
          </View>
        ) : (
          <>
            {errorLoading ? (
              <View>
                <Text variant="body" style={styles.textLoading}>
                  {errorLoading.message}
                </Text>
              </View>
            ) : (
              <FlatList
                style={{
                  flex: 1,
                  paddingHorizontal: "5%",
                }}
                data={dataRecent?.getMyRecentRoutes}
                renderItem={({ item, index }) => (
                  <ListItem
                    detail
                    key={`${item}_${index}`}
                    icon="Search"
                    title={item.origin || ""}
                    subTitle={item.destination}
                    onPress={onRoute}
                  />
                )}
                keyExtractor={(item, index) => `${item}_${index}`}
              />
            )}
          </>
        )}
      </View>
    </>
  );

  const onGoogleRoute = async (details: IDetails) => {
    setStateModal(true);
    try {
      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = location.coords;

        const response = await (
          await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${API_KEY}`,
          )
        ).json();

        const route = response.results[0].formatted_address;

        navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
          origin: route,
          destination: details?.formatted_address || details?.description,
        });
      }
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setStateModal(false);
    }
  };

  const altitude = search.length <= 2 ? 0.2 : 1;
  // const altitude = search.length <= 2 ? (Platform.OS === "ios" ? 0.1 : 0.2) : 1;

  return (
    <View style={styles.container}>
      {stateModal && (
        <Modal
          state={stateModal}
          notTouch
          onClosed={() => setStateModal(false)}
        >
          <View style={styles.containerModal}>
            <TouchableOpacity activeOpacity={1} style={styles.contentModal}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <GoogleSearch
        placeholder="Where are you going?"
        onChange={(str) => setSearch(str)}
        onPress={(details) => onGoogleRoute(details)}
        containerStyle={{
          ...styles.googleSearch,
          flex: altitude,
        }}
      />

      {search.length <= 2 && <History />}
    </View>
  );
};

export default SearchRouter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  googleSearch: {
    marginTop: 60,
  },
  containerScroll: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    height: 50,
    justifyContent: "center",
  },
  text: {
    marginVertical: "1%",
  },
  textLoading: {
    textAlign: "center",
    marginVertical: "5%",
  },

  containerModal: {
    marginVertical: height * (Platform.OS === "ios" ? 0.5 : 0.4),
  },
  contentModal: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignContent: "center",
  },
});
