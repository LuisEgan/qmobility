import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icons, Card as CardItem, TextWithUnit } from "../../../../components";
import theme, { Text } from "../../../../config/Theme";
import {
  APP_STACK_SCREENS_NAMES,
  RANGE_MAX,
  RANGE_MIN,
} from "../../../../lib/constants";

const { height, width } = Dimensions.get("window");

const ICONSSIZE = width * 0.04;

interface ICard {
  rangeMin: number;
  rangeMax: number;
  setShowFilter: (show: boolean) => void;
}

const Card = (props: ICard) => {
  const { rangeMin = RANGE_MIN, rangeMax = RANGE_MAX, setShowFilter } = props;

  const { navigate } = useNavigation();

  const CardTitle = () => (
    <View>
      <View style={styles.cardTitleContent}>
        <Icons icon="Info" size={ICONSSIZE} fill={theme.colors.primary} />
      </View>

      <TextWithUnit
        text={`${rangeMin}-${rangeMax}`}
        unitTextVariant="heading1"
        unitTextStyle={{ marginBottom: 0 }}
      />
    </View>
  );

  const CardSubtitle = () => (
    <View style={styles.cardSubContainer}>
      <Text variant="label" color={theme.colors.white}>
        eVe Range
      </Text>

      <View style={styles.cardSubContent}>
        <TouchableOpacity
          style={styles.cardIcons}
          onPress={() => setShowFilter(true)}
        >
          <Icons icon="Filter" size={ICONSSIZE} fill={theme.colors.primary} />
          <Text variant="label" color="primary">
            Adjust filter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardIcons}
          onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyRoutes)}
        >
          <Icons icon="Edit" size={ICONSSIZE} fill={theme.colors.primary} />
          <Text variant="label" color="primary">
            Edit Trips
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <CardItem
        title={<CardTitle />}
        subTitle={<CardSubtitle />}
        containerStyle={styles.cardContainer}
        contentStyle={styles.contentCard}
      />
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {},

  // CARDTITLE
  cardTitleContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardTitleContentText: {
    flexDirection: "row",
  },
  cardTitleText: {
    opacity: 0.5,
  },

  // CARDSUB
  cardSubContainer: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    flex: 1,
  },
  cardIcons: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  cardSubContent: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
  },

  // CARD
  cardContainer: {
    width: "100%",
    height: 125,
    marginBottom: height * 0.02,
  },
  contentCard: {
    paddingHorizontal: "5%",
    paddingVertical: "4%",
    height: 125,
  },
});
