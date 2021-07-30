import React from "react";
import { StyleSheet, View } from "react-native";
import { TIcon } from "../../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../../lib/Types";
import { Icons } from "../..";
import theme, { Text } from "../../../config/Theme";

export const ROUTER_POINTS_LIST_ITEM_ICONS_COL_WIDTH = 25;
const D = 26;

export interface IRouterPointsListItem extends IComponentsDefaults {
  label: string;
  description?: string;
  icon?: TIcon | JSX.Element;
  svgFill?: string;
  isExtreme?: boolean;
  isChargingPoint?: boolean;
  isStartPoint?: boolean;
  isEndPoint?: boolean;
  latitude?: number;
  longitude?: number;
  Id?: number;
}

const RouterPointListItem = (props: IRouterPointsListItem) => {
  const {
    containerStyle,
    label,
    description,
    svgFill,
    icon,
    isExtreme = false,
    isChargingPoint = false,
    isEndPoint = false,
    isStartPoint = false,
  } = props;

  const endPointStyle = isEndPoint ? { marginBottom: 0 } : {};

  const setLabelVariant = () => {
    if (isExtreme) return "heading2";

    if (isChargingPoint) return "bodyHighlight";

    return "body";
  };

  const BulletIcon = () => {
    if (typeof icon === "string") {
      return (
        <Icons icon={icon} size={25} fill={svgFill || theme.colors.primary} />
      );
    }

    if (isStartPoint) {
      return (
        <View style={styles.constenIcons}>
          <Icons size={23} icon="Circle" fill={theme.colors.primary} />
        </View>
      );
    }

    if (isChargingPoint) {
      return (
        <View style={styles.constenIcons}>
          <Icons size={23} icon="EvStation" />
        </View>
      );
    }

    if (isEndPoint) return <Icons size={33} icon="Market" />;

    return (
      icon || (
        <View
          style={[
            styles.constenIcons,
            {
              backgroundColor: theme.colors.primary,
              paddingLeft: 5,
              paddingTop: 2,
            },
          ]}
        >
          <Icons size={23} icon="EvStation" fill={theme.colors.white} />
        </View>
      )
    );
  };

  return (
    <View style={[styles.container, endPointStyle, containerStyle]}>
      {!isEndPoint && (
        <View style={[styles.dottedLine]}>
          {[...Array(10)].map(() => (
            <Icons
              key={Math.random()}
              icon="Dot"
              size={8}
              fill={theme.colors.borderColor}
              containerStyle={styles.dot}
            />
          ))}
        </View>
      )}

      <View style={styles.iconContainer}>
        <BulletIcon />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={{
            paddingRight: 20,
          }}
          variant={setLabelVariant()}
        >
          {label}
        </Text>
        {description && <Text variant="bodySmall">{description}</Text>}
      </View>
    </View>
  );
};

export default RouterPointListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 45,
  },

  dottedLine: {
    position: "absolute",
    left: 0,
    top: 5,
    width: ROUTER_POINTS_LIST_ITEM_ICONS_COL_WIDTH,
    alignItems: "center",
    height: "220%",
    overflow: "hidden",
    // backgroundColor: "gold",
  },
  dot: {
    marginBottom: 7,
  },

  iconContainer: {
    marginRight: 10,
    marginLeft: 2,
    width: ROUTER_POINTS_LIST_ITEM_ICONS_COL_WIDTH,
    alignItems: "center",
  },

  textContainer: {
    justifyContent: "center",
  },

  constenIcons: {
    height: D,
    width: D,
    borderRadius: D,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 9,
  },
});
