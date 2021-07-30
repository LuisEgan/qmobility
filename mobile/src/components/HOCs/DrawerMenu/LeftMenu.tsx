import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import theme, { Text } from "../../../config/Theme";
import { ImageProfile } from "../..";
import IconsList from "../../Lists/IconsList";
import { IIconsListItem } from "../../Lists/IconsList/IconsListItem";
import { APP_STACK_SCREENS_NAMES, CATALOG_URI } from "../../../lib/constants";
import { IComponentsDefaults } from "../../../lib/Types";
import { AuthContext } from "../../../navigation/AuthContext";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";

const { width, height } = Dimensions.get("screen");

type ListItems = Array<IIconsListItem>;

interface ILeftMenu extends IComponentsDefaults {
  onItemPress?: (navigateTo?: string) => void;
}

const LeftMenu = (props: ILeftMenu) => {
  const { onItemPress: onItemPressProp } = props;

  const { signOut } = useContext(AuthContext);
  const { navigate } = useNavigation();

  const { data: userData } = useQuery<{ user: IUser }, IUser>(
    User.queries.user,
  );

  const onItemPress = (navigateTo: string) => {
    if (onItemPressProp) {
      onItemPressProp(navigateTo);
    }

    navigate(navigateTo);
  };

  const listItems: ListItems = [
    {
      text: "Create Route",
      icon: "Map",
      textColor: theme.colors.white,
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.Main),
    },
    {
      text: "My Routes",
      icon: "Timeline",
      textColor: theme.colors.white,
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.MyRoutes),
    },
    {
      text: "My Vehicles",
      icon: "DirectionsCar",
      textColor: theme.colors.white,
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.MyCars),
    },
    {
      text: "My Stats",
      icon: "AssessMent",
      textColor: "white",
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.Activty),
    },
    {
      text: "My Match",
      icon: "Star",
      textColor: theme.colors.white,
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.MyMatch),
    },
    {
      text: "Catalog",
      icon: "CarColor",
      textColor: theme.colors.white,
      onPress: () => {
        Linking.openURL(CATALOG_URI);
      },
    },
  ];

  const optionsListItems: ListItems = [
    {
      text: "Account Settings",
      icon: "Setting",
      textColor: theme.colors.white,
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.Profile),
    },
    {
      text: "Logout",
      icon: "ExitApp",
      textColor: theme.colors.white,
      onPress: () => signOut(),
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() => navigate(APP_STACK_SCREENS_NAMES.Profile)}
        >
          <ImageProfile
            color={theme.colors.primary}
            changePhotoOption={false}
            avatarUrl={userData?.user.avatarUrl}
          />
        </TouchableOpacity>
        <Text variant="heading1" color={theme.colors.white}>
          {userData?.user.name}
        </Text>
        <Text variant="body" color="bodySmall" numberOfLines={1}>
          {userData?.user.email}
        </Text>
      </View>

      <View style={{ height: 60 }} />

      <View style={styles.list}>
        <IconsList items={listItems} />
      </View>

      <View style={{ height: 60 }} />

      <View style={styles.options}>
        <IconsList items={optionsListItems} />
      </View>
    </ScrollView>
  );
};

export default LeftMenu;

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.08,
    paddingLeft: width * 0.05,
  },

  info: {},

  list: {
    // marginTop: 60,
  },

  options: {
    marginBottom: 20,
  },
});
