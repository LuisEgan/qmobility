import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { Map, InputSearch } from "../../../components";
import { DrawerLeftMenu, DrawerRightMenu } from "../../../components/HOCs";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";

import CAR from "../../../assets/png/Nissan_Leaf_2018-02.png";

const { height } = Dimensions.get("window");

enum EDrawer {
  RIGHT,
  LEFT,
}

const Main = () => {
  const { data: userData } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [isDrawerLeftOpen, setIsDrawerLeftOpen] = useState<boolean>(false);
  const [isDrawerRightOpen, setIsDrawerRightOpen] = useState<boolean>(false);

  const toggleDrawer = (drawer: EDrawer) => {
    if (drawer === EDrawer.LEFT) {
      setIsDrawerLeftOpen(!isDrawerLeftOpen);
      return;
    }
    setIsDrawerRightOpen(!isDrawerRightOpen);
  };

  return (
    <>
      <DrawerLeftMenu
        isDrawerOpen={isDrawerLeftOpen}
        onDrawerToggle={setIsDrawerLeftOpen}
        swippable={false}
      >
        <DrawerRightMenu
          isDrawerOpen={isDrawerRightOpen}
          onDrawerToggle={setIsDrawerRightOpen}
        />
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <InputSearch
              containerStyle={styles.inputSearch}
              placeholder="Where are you going?"
              onChange={() => null}
              leftIcon="Menu"
              onLeftIconPress={() => toggleDrawer(EDrawer.LEFT)}
            />

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.carImgContainer}
              onPress={() => toggleDrawer(EDrawer.RIGHT)}
            >
              <ImageBackground
                source={
                  userData
                    ? { uri: userData.user.selectedVehicle?.Images[0] }
                    : CAR
                }
                style={styles.imgBg}
              />
            </TouchableOpacity>
          </View>

          <Map initialMain state />
        </View>
      </DrawerLeftMenu>
    </>
  );
};

export default Main;

const C = Platform.OS === "ios" ? 0.06 : 0.07;

const HEIGHTIMG = height * C;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.1,
    margin: 35,
    zIndex: 1,
  },
  inputSearch: {
    elevation: 1,
    flex: 1,
  },
  separator: {
    flex: 0.05,
  },
  carImgContainer: {
    height: HEIGHTIMG,
    width: HEIGHTIMG,
    overflow: "hidden",
    borderRadius: 100,
  },
  imgBg: {
    flex: 1,
    height: HEIGHTIMG,
    width: HEIGHTIMG,
  },
});
