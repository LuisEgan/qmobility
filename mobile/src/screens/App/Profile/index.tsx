import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import {
  Header,
  ImageProfile,
  Input,
  Icons,
  CardImage,
  PhoneInput,
} from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { FullScreenModal } from "../../Feedback";
import { dateToText } from "../../../lib/dates";
import { cleanPhoneNumber } from "../../../lib/strings";
import { CountryApocope } from "../../../components/PhoneInput/Types";

const CreateProfile = () => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  const { data: userData, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (loading) return <FullScreenModal show />;
  if (!isFocused) return null;

  const phoneCountryApocope = (userData?.user.phoneCountry
    || "GB") as CountryApocope;

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <Header
        title="My Profile"
        subTitle="To store all your info in one place"
        icon="Menu"
        iconRight="Edit"
        textRight="Edit"
        onPressRight={() => navigate(APP_STACK_SCREENS_NAMES.EditProfile)}
        onPress={toggleDrawer}
      />
      <ScrollView
        style={{
          height: "100%",
          backgroundColor: theme.colors.white,
        }}
      >
        <View style={[styles.container]}>
          <ImageProfile
            color={theme.colors.primary}
            avatarUrl={userData?.user.avatarUrl}
            changePhotoOption={false}
          />

          <Text variant="heading1">{userData?.user.name}</Text>

          <Text variant="bodyHighlight">{userData?.user.lastname}</Text>

          <Text variant="subheadingLight">{userData?.user.email}</Text>

          <Input
            disabled
            defaultValue={dateToText(`${userData?.user.dateOfBirth}`)}
            label="Date of birth"
          />

          <PhoneInput
            phone={`${cleanPhoneNumber(
              userData?.user.phone || "",
              userData?.user.phoneCountryCode,
            )}`}
            disabled
            phoneCountry={phoneCountryApocope}
          />

          <View style={styles.containerTtitleEdition}>
            <Text variant="label">YOUR VIRTUAL EVE</Text>
          </View>
          <CardImage
            name={userData?.user.selectedVehicle?.Vehicle_Make}
            imgUri={userData?.user.selectedVehicle?.Images[0]}
            title="Defaul eVe"
            subTitle={userData?.user.selectedVehicle?.Vehicle_Model}
            containerStyle={[
              styles.Card,
              {
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.grayLight,
              },
            ]}
          />

          <View style={styles.containerTtitleEdition}>
            <Text variant="label">YOUR ICE VEHICLE</Text>
          </View>

          {userData?.user.iceVehicle ? (
            <CardImage
              name={userData?.user.iceVehicle?.Make}
              title="Default ICE"
              subTitle={userData?.user.iceVehicle?.MakeModel}
              svgIcon={<Icons icon="DirectionsCar" size={80} />}
            />
          ) : (
            <Text>You don&apos;t have a registered ICE vehicle.</Text>
          )}
        </View>
      </ScrollView>
    </DrawerLeftMenu>
  );
};
export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    height: "100%",
    paddingBottom: 130,
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  Card: {
    borderWidth: 1,
  },
});
