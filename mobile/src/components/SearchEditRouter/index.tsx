import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import GoogleSearch, { IDetails } from "../GoogleSearch/index";

export type IChangeRoute = "START" | "END";

export interface IEditChangeRoute {
  str: string;
  type: IChangeRoute;
}

interface ISearchEditRouter {
  typeEdit: IChangeRoute;
  onChange: (value: IEditChangeRoute) => void;
  onCancel: () => void;
  placeholder?: string;
}

const { width } = Dimensions.get("window");

const SearchEditRouter = (props: ISearchEditRouter) => {
  const { typeEdit, onChange, onCancel, placeholder } = props;

  const onGoogleReute = async (details: IDetails) => {
    onChange({
      str: details.description,
      type: typeEdit,
    });
  };

  return (
    <View style={styles.container}>
      <GoogleSearch
        onTypeCancel={() => onCancel()}
        placeholder={placeholder || "Where are you going?"}
        onPress={(details) => onGoogleReute(details)}
        containerStyle={{
          ...styles.googleSearch,
          flex: 1,
        }}
      />
    </View>
  );
};

export default SearchEditRouter;

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    paddingHorizontal: "5%",
  },
  googleSearch: {
    marginTop: Platform.OS === "ios" ? 60 : 20,
  },
});
