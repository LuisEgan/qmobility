import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
  DescriptionRow,
} from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../ListItem/index";
import Icons from "../svg/index";
import theme from "../../config/Theme";

import app from "../../../app.json";

// TODO use independent GCP API KEY with
// TODO "Application Restrictions" set to IP Addresses or HTTP Referers
const API_KEY = app.expo.android.config.googleMaps.apiKey;

export interface IDetails
  extends GooglePlaceDetail,
    Omit<DescriptionRow, "types"> {}

interface IGoogleSearch {
  placeholder?: string;
  onChange?: (str: string) => void;
  onPress?: (details: IDetails) => void;
  onTypeCancel?: () => void;
  // TODO add proper type definition
  containerStyle?: Record<string, unknown>;
}

const GoogleSearch = (props: IGoogleSearch) => {
  const {
    containerStyle,
    placeholder,
    onChange,
    onPress,
    onTypeCancel,
  } = props;

  const { goBack } = useNavigation();

  return (
    <GooglePlacesAutocomplete
      autoFocus
      minLength={2}
      renderRow={(details) => (
        <View style={{ height: 80, flex: 1 }}>
          <ListItem
            onPress={() => {
              if (onPress && details) onPress((details as unknown) as IDetails);
            }}
            icon="Search"
            title={details?.structured_formatting?.main_text}
            subTitle={details?.structured_formatting?.secondary_text}
          />
        </View>
      )}
      preProcess={(str) => {
        if (onChange) onChange(str);
        return str;
      }}
      onFail={(error) => console.warn(error)}
      renderLeftButton={() => (
        <TouchableOpacity
          style={styles.contentIconsLeft}
          onPress={onTypeCancel || goBack}
        >
          <Icons icon="ArrowBackLight" />
        </TouchableOpacity>
      )}
      textInputProps={{}}
      styles={{
        container: {
          borderColor: theme.colors.white,
          zIndex: 10,
          ...containerStyle,
        },

        textInputContainer: {
          backgroundColor: theme.colors.white,
          borderRadius: 10,
          height: 45,
        },
        textInput: {
          fontSize: 16,
        },
        row: {
          height: 70,
        },
      }}
      placeholder={placeholder}
      fetchDetails
      onPress={(data, details = null) => {
        if (onPress && details) onPress((details as unknown) as IDetails);
      }}
      query={{
        key: API_KEY,
        language: "en",
      }}
      filterReverseGeocodingByTypes={["geocode"]}
      enablePoweredByContainer={false}
    />
  );
};

GoogleSearch.defaultProps = {
  placeholder: "Search",
};

export default GoogleSearch;

const styles = StyleSheet.create({
  contentIconsLeft: {
    marginVertical: 10,
    justifyContent: "center",
  },
  contentIconsRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 10,
  },
});
