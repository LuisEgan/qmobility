import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { IComponentsDefaults } from "../../../lib/Types";
import RouterPointListItem, {
  IRouterPointsListItem,
} from "./RouterPointsListItem";
import theme from "../../../config/Theme";

interface IRoutePointsList extends IComponentsDefaults {
  points?: Array<IRouterPointsListItem> | [];
  height?: number;
  startLocation: string;
  endLocation: string;
}

const RoutePointsList = (props: IRoutePointsList) => {
  const {
    containerStyle,
    points = [],

    startLocation,
    endLocation,
  } = props;

  const data = [{ label: startLocation }, ...points, { label: endLocation }];

  return (
    <View style={[styles.container, containerStyle]}>
      {points && (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item, index }) => (
            <RouterPointListItem
              key={`${item}_${index}`}
              {...item}
              isStartPoint={index === 0}
              isEndPoint={index === data.length - 1}
              isExtreme={index === 0 || index === data.length - 1}
            />
          )}
          keyExtractor={(item, index) => `${item}_${index}`}
        />
      )}
    </View>
  );
};

export default React.memo<IRoutePointsList>(RoutePointsList);

const LIST_PADDING = 10;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    padding: LIST_PADDING,
    flexDirection: "row",
    borderColor: theme.colors.borderColor,
  },

  list: { zIndex: 1 },
});
