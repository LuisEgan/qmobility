import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header, Icons, Button, CardImage } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { TCheckCarNavProps } from "../../../navigation/Types/NavPropsTypes";

const { width } = Dimensions.get("window");

type ICheckCar = TCheckCarNavProps;

const CheckCar = (props: ICheckCar) => {
  const {
    route: {
      params: { vehicleRecommendation },
    },
  } = props;
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        title="Profile Created"
        subTitle="Well done"
        containerStyle={{
          backgroundColor: theme.colors.grayLighter,
        }}
      />

      <ScrollView style={styles.content}>
        <View style={styles.containerTitleEdition}>
          <Icons icon="Done" fill={theme.colors.primaryLight} />
          <Text variant="subheadingLight">Congratulations! You’re done!</Text>
          <Text variant="subheadingLight">This is your perfect match:</Text>
        </View>

        <CardImage
          containerStyle={styles.cardCar}
          textStyle={{ color: theme.colors.white }}
          imgUri={vehicleRecommendation.vehicle.Images[0]}
          name={`${vehicleRecommendation.make} ${vehicleRecommendation.makeModel}`}
          title="Default eVe"
          subTitle={`${vehicleRecommendation.category} eVe`}
        />
      </ScrollView>

      <Button
        label="GO TO MAP"
        variant="primary"
        onPress={() => navigate(APP_STACK_SCREENS_NAMES.Main)}
        containerStyle={styles.buttonStyle}
      />
    </View>
  );
};
export default CheckCar;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.white,
  },
  content: {
    paddingHorizontal: "5%",
  },
  containerTitleEdition: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "5%",
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
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  cardCar: {
    width: "100%",
    marginVertical: "1%",
    height: 120,
    borderRadius: 10,
    backgroundColor: theme.colors.secondaryDark,
  },

  buttonStyle: {
    marginHorizontal: "10%",
    marginVertical: "6%",
    width: width * 0.8,
  },
});
