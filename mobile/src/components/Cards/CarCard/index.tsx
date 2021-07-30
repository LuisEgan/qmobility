import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import theme, { Text } from "../../../config/Theme";
import { IVehicle } from "../../../gql/Vehicle/Types";
import { kmToMiles } from "../../../lib/numbers";
import { numberWithDots } from "../../../lib/strings";
import { IComponentsDefaults } from "../../../lib/Types";
import Button from "../../Button";
import Icons from "../../svg";

const { width } = Dimensions.get("window");

interface ICarCard extends IComponentsDefaults {
  eVe: IVehicle;
  height?: number;
  width?: number;
  contentStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  onPressPrimary: () => void;
  onPressSecondary?: () => void;
}

const CarCard = (props: ICarCard) => {
  const {
    eVe,
    containerStyle,
    height: heightProp,
    width: widthProp,
    contentStyle,
    imageStyle,
    onPressPrimary,
    onPressSecondary,
  } = props;

  return (
    <View
      style={[
        styles.container,
        { height: heightProp, width: widthProp },
        containerStyle,
      ]}
    >
      <View style={[styles.imageContainer, imageStyle]}>
        <ImageBackground
          style={styles.image}
          source={{
            uri: eVe?.Images ? eVe?.Images[0] : "",
          }}
        />
      </View>

      <View style={[styles.content, contentStyle]}>
        <Text variant="heading2">
          {eVe?.Vehicle_Make}
          {" "}
          {eVe?.Vehicle_Model}
        </Text>

        <View style={styles.textContainer}>
          <View style={styles.textIcon}>
            <Icons icon="Person" size={25} fill={theme.colors.primary} />
            <Text style={styles.iconText}>{eVe?.Misc_Seats}</Text>
          </View>

          <View style={styles.textIcon}>
            <Icons icon="Done" size={25} fill={theme.colors.primary} />
            <Text style={styles.iconText}>
              {numberWithDots(`${eVe?.Price_From_UK}`)}
            </Text>
          </View>

          <View style={styles.textIcon}>
            <Icons icon="Market" size={25} fill={theme.colors.primary} />
            <Text style={styles.iconText}>
              {kmToMiles(eVe?.Range_Real)}
              {" "}
              Mi
            </Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            containerStyle={styles.button}
            variant="primary"
            label="DETAILS"
            onPress={onPressPrimary}
          />

          {onPressSecondary && (
            <Button
              inverse
              containerStyle={[styles.button, { marginLeft: 10 }]}
              variant="primary"
              label="FILTER"
              onPress={onPressSecondary}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {},

  imageContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },

  content: {
    flex: 0.9,
    backgroundColor: theme.colors.grayLighter,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  textContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginRight: 15,
  },

  iconText: {
    marginLeft: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  button: { height: 30, width: width * 0.3 },
});
