import React from "react";
import { View, StyleSheet } from "react-native";
import IconsListItem, { IIconsListItem } from "./IconsListItem";
import { IComponentsDefaults } from "../../../lib/Types";

type ListItems = Array<IIconsListItem>;

interface IIconsList extends IComponentsDefaults {
  items: ListItems;
}

const IconsList = (props: IIconsList) => {
  const { items } = props;

  return (
    <View style={styles.container}>
      {items.map((i) => (
        <IconsListItem key={i.text} {...i} />
      ))}
    </View>
  );
};

export default IconsList;

const styles = StyleSheet.create({
  container: {},
});
