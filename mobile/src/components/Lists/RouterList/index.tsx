import React from "react";
import { FlatList } from "react-native";
import { IComponentsDefaults } from "../../../lib/Types";
import RouteListItem from "./RouteListItem";
import { IGetMySaveRoute, ISavedRoute } from "../../../gql/Route/queries";

interface IList extends IComponentsDefaults {
  ListArray: IGetMySaveRoute;
  filter: string;
  onEdit?: (item: ISavedRoute) => void;
}

const RouterList = (props: IList) => {
  const { ListArray = [], filter, onEdit } = props;

  let newListArray = ListArray;

  if (filter !== "All") {
    newListArray = ListArray
      ? ListArray.filter((item) => item.category === filter)
      : [];
  }

  const onValidation = (item: ISavedRoute) => {
    if (onEdit) onEdit(item);
  };

  return (
    <FlatList
      data={newListArray}
      renderItem={({ item, index }) => (
        <RouteListItem
          key={`${item}_${index}`}
          {...item}
          onEdit={() => {
            onValidation(item);
          }}
        />
      )}
      keyExtractor={(item, index) => `${item}_${index}`}
    />
  );
};
export default RouterList;
