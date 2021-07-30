import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import theme, { Text } from "../../../config/Theme";
import Icons from "../../svg";
import { IGetMySaveRoute, ISavedRoute } from "../../../gql/Route/queries";
import { APP_STACK_SCREENS_NAMES, UK_REGION } from "../../../lib/constants";

import { Route, User } from "../../../gql";
import {
  IDeleteMyRoute,
  IDeleteMyRouteVar,
} from "../../../gql/Route/mutations";

const RouteListItem = (props: ISavedRoute) => {
  const {
    friendlyName,
    destination,
    origin,
    frequency,
    category,
    id,
    onEdit,
  } = props;

  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const { navigate } = useNavigation();

  const onNavigationRoute = () => {
    navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
      origin,
      destination,
      initialLocation: UK_REGION,
    });
  };

  const [deleteMyRoutes] = useMutation<
    { deleteMyRoutes: IDeleteMyRoute },
    IDeleteMyRouteVar
  >(Route.mutations.deleteMyRoute, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: User.queries.getMyStats,
      },
    ],
    update(cache) {
      const query = cache.readQuery<{ getMyRoutes: IGetMySaveRoute }>({
        query: Route.queries.getMySaveRoute,
      });

      const newRoutes: ISavedRoute[] = [];

      query?.getMyRoutes.forEach((route) => {
        if (route.id === id) return;
        newRoutes.push(route);
      });

      cache.writeQuery({
        query: Route.queries.getMySaveRoute,
        data: {
          getMyRoutes: newRoutes,
        },
      });
    },
  });

  const onDelete = async () => {
    try {
      const variables = {
        myRouteId: id,
      };

      const { errors } = await deleteMyRoutes({
        variables,
      });

      if (errors) {
        throw new Error("Error on deleting route");
      }
    } catch (error) {
      console.error("onSaveMyRouter -> error", error);

      Alert.alert(error, "", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } finally {
      setActionLoading(false);
    }
  };

  const onAlert = () => {
    setActionLoading(true);
    Alert.alert(`${friendlyName}`, `${category}`, [
      {
        text: "Delete",
        onPress: () => onDelete(),
        style: "destructive",
      },
      {
        text: "Edit",
        onPress: () => {
          setActionLoading(false);
          isEdit();
        },
      },
      {
        text: "Cancel",
        onPress: () => setActionLoading(false),
        style: "cancel",
      },
    ]);
  };

  const isEdit = () => {
    if (onEdit) onEdit();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => !actionLoading && onNavigationRoute()}
      >
        <View style={styles.content}>
          <View style={styles.detailContent}>
            <Icons icon="Home" fill={theme.colors.primary} size={22} />
          </View>

          <View style={styles.detailContainer}>
            <View>
              <Text variant="heading2" numberOfLines={1}>
                {friendlyName}
              </Text>
              <Text numberOfLines={1} variant="body">
                {origin}
              </Text>
              <Text numberOfLines={1} variant="body">
                {destination}
              </Text>

              <Text numberOfLines={1} variant="body">
                {`Frequency: ${frequency}`}
              </Text>
            </View>
          </View>

          {actionLoading ? (
            <View style={styles.iconRight}>
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.iconRight}
              onPress={() => onAlert()}
            >
              <Icons icon="MoreVert" fill={theme.colors.primary} size={25} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default RouteListItem;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: "2%",
    width,
  },
  containerButton: {
    height: 110,
    marginHorizontal: "5%",
    borderRadius: 10,
    backgroundColor: theme.colors.grayLighter,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  detailContent: {
    flex: 0.1,
    height: "100%",
    paddingTop: 15,
    alignItems: "center",
  },
  detailContainer: {
    height: "100%",
    paddingTop: 10,
    flex: 0.8,
  },
  iconRight: {
    height: "100%",
    flex: 0.1,
    alignItems: "center",
    marginTop: 20,
    justifyContent: "flex-start",
  },
});
