import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { Header } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { RouterList } from "../../../components/Lists";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { Route, User } from "../../../gql";
import { IGetMySaveRoute, ISavedRoute } from "../../../gql/Route/queries";
import ScrollCategory from "./ScrollCategory";
import ModalSaveRoute, {
  IModalSaveRoute,
} from "../MapSearchDone/ModalSaveRoute";
import { IUser } from "../../../gql/User/Types";

const MyRoutes = () => {
  const {
    loading: getMySaveRouteLoading,
    data: getMySaveRouteData,
    error: getMySaveRouteError,
  } = useQuery<{ getMyRoutes: IGetMySaveRoute }>(Route.queries.getMySaveRoute);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("All");
  const { data: allUserInfo } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [stateEdit, setStateEdit] = useState<boolean>(false);

  const [propsModal, setPropsModal] = useState<IModalSaveRoute>({
    categoryOld: "",
    friendlyNameOld: "",
    frequencyOld: "",
    startLocation: "",
    endLocation: "",
    id: "",
    kwh: 0,
    totalDistance: 0,
    totalTime: 0,
  });

  const EditRouter = (item: ISavedRoute) => {
    const obj: IModalSaveRoute = {
      categoryOld: item.category,
      friendlyNameOld: item.friendlyName,
      frequencyOld: item.frequency,
      startLocation: item.origin,
      endLocation: item.destination,
      id: item.id,
      kwh: item.kwh || 0,
      totalDistance: item.totalDistance || 0,
      totalTime: item.totalTime || 0,
    };
    setPropsModal(obj);
    setTimeout(() => {
      setStateEdit(!stateEdit);
    }, 100);
  };

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      {stateEdit && (
        <ModalSaveRoute
          stateModal={stateEdit}
          isEdit
          onClosed={() => setStateEdit(!stateEdit)}
          {...propsModal}
          carId={allUserInfo?.user?.selectedVehicle?.Vehicle_ID || 0}
          label="Edit your route"
        />
      )}

      <Header
        title="My Routes"
        subTitle="All your everyday routes"
        icon="Menu"
        onPress={() => setIsDrawerOpen(!isDrawerOpen)}
      />

      <ScrollCategory
        data={getMySaveRouteData?.getMyRoutes || []}
        filter={filter}
        onPress={(str) => setFilter(str)}
      />
      <View style={styles.container}>
        {getMySaveRouteLoading ? (
          <View style={styles.contentLoading}>
            <ActivityIndicator color={theme.colors.primary} />
            <Text variant="bodyHighlight" style={styles.textLoading}>
              Loading...
            </Text>
          </View>
        ) : (
          <>
            {!getMySaveRouteError ? (
              <RouterList
                filter={filter}
                onEdit={(item) => EditRouter(item)}
                ListArray={getMySaveRouteData?.getMyRoutes || []}
              />
            ) : (
              <View>
                <Text>{getMySaveRouteError.message}</Text>
              </View>
            )}
          </>
        )}
      </View>
    </DrawerLeftMenu>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingBottom: 100,
  },
  contentLoading: {
    marginTop: "50%",
  },
  textLoading: {
    textAlign: "center",
    marginVertical: "5%",
  },
});
