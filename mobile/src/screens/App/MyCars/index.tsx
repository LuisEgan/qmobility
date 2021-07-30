import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import {
  Header,
  Icons,
  Footer,
  CardImage,
  Document,
} from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { FullScreenModal } from "../../Feedback";
import { APP_STACK_SCREENS_NAMES, CATALOG_URI } from "../../../lib/constants";

const { height } = Dimensions.get("window");

const MyCars = () => {
  const { navigate } = useNavigation();

  const { data: userData, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [stateWeb, setStateWeb] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const openCatalog = async () => {
    setStateWeb(!stateWeb);
  };

  if (loading) return <FullScreenModal show />;

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      {stateWeb && (
        <Document
          state={stateWeb}
          onClosed={() => setStateWeb(!stateWeb)}
          url={CATALOG_URI}
        />
      )}
      <View style={styles.container}>
        <Header
          title="My Vehicles"
          subTitle="These are all you beautiful cars"
          icon="Menu"
          onPress={toggleDrawer}
        />

        <ScrollView
          style={[
            styles.content,
            { backgroundColor: theme.colors.contentBackground },
          ]}
        >
          <View style={styles.containerTtitleEdition}>
            <Text variant="label">YOUR VIRTUAL EVE</Text>
            <Icons
              icon="Edit"
              fill={theme.colors.grayLight}
              size={25}
              onPress={() => navigate(APP_STACK_SCREENS_NAMES.EditProfile)}
            />
          </View>

          <CardImage
            onPress={() => navigate(APP_STACK_SCREENS_NAMES.Details)}
            name={userData?.user.selectedVehicle?.Vehicle_Make}
            title="Default eVe"
            subTitle={userData?.user.selectedVehicle?.Vehicle_Model}
            imgUri={userData?.user.selectedVehicle?.Images[0]}
            containerStyle={{ backgroundColor: theme.colors.secondaryDark }}
            textStyle={{ color: theme.colors.white }}
          />

          <View style={styles.containerTtitleEdition}>
            <Text variant="label">YOUR ICE VEHICLE</Text>
            <Icons
              icon="Edit"
              fill={theme.colors.grayLight}
              size={25}
              onPress={() => navigate(APP_STACK_SCREENS_NAMES.EditProfile)}
            />
          </View>

          {userData?.user.iceVehicle ? (
            <CardImage
              onPress={() => navigate(APP_STACK_SCREENS_NAMES.DetailsICE)}
              name={userData?.user.iceVehicle?.Make}
              title="Default ICE"
              subTitle={userData?.user.iceVehicle?.MakeModel}
              svgIcon={<Icons icon="DirectionsCar" size={80} />}
            />
          ) : (
            <Text>You don&apos;t have a registered ICE vehicle.</Text>
          )}
        </ScrollView>
        <Footer
          title="Feeling a bit adventurous today?"
          subTitle="Check our catalogue"
          onPressSubtitle={openCatalog}
        />
      </View>
    </DrawerLeftMenu>
  );
};
export default MyCars;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  content: {
    paddingHorizontal: "5%",
    height: height * 0.69,
    paddingBottom: 100,
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  cardMyCar: {
    width: "100%",
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.grayLight,
  },
  costentCar: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  contentImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: "5%",
    backgroundColor: theme.colors.primary,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
