import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icons from "../svg";
import theme, { Text } from "../../config/Theme";
import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

const editNameCity = (nameCity: string): string => {
  if (nameCity.includes(".")) {
    return "Current location";
  }
  return nameCity;
};

interface IListItem extends IComponentsDefaults {
  icon?: TIcon;
  title: string;
  subTitle?: string;
  detail?: boolean;
  onPress?: (obj: { origin?: string; destination?: string }) => void;
}

const ListItem = (props: IListItem) => {
  const { title, subTitle, icon, detail, containerStyle, onPress } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        onPress
        && onPress({
          origin: title,
          destination: subTitle,
        })}
      style={[styles.container, containerStyle]}
    >
      {icon && (
        <View style={styles.viewLeft}>
          <Icons icon={icon} fill={theme.colors.primary} size={30} />
        </View>
      )}
      <View style={styles.textContent}>
        <Text numberOfLines={1} style={styles.text} variant="body">
          {editNameCity(title)}
        </Text>
        {subTitle && (
          <Text numberOfLines={1} style={styles.text} variant="label">
            {editNameCity(subTitle)}
          </Text>
        )}
      </View>
      {detail && (
        <TouchableOpacity style={styles.viewRight}>
          <Icons icon="MoreVert" fill={theme.colors.grayLight} size={20} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: theme.colors.grayLighter,
  },
  viewLeft: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  textContent: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    width: "100%",
    textAlignVertical: "center",
  },
  viewRight: {
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
  },
});
