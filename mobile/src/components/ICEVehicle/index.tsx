import { ApolloError } from "@apollo/client";
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "../../config/Theme";
import { IIceVehicle } from "../../gql/Vehicle/Types";

interface IICEVehicleProps {
  loading?: boolean;
  error?: ApolloError;
  data?: IIceVehicle;
}

const ICEVehicle = (props: IICEVehicleProps) => {
  const { loading, error, data } = props;

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {error ? (
            <Text variant="error">No vehicle found</Text>
          ) : (
            <>
              <View style={styles.carText}>
                <Text variant="bodyBold">Model: </Text>
                <Text>{data?.MakeModel}</Text>
              </View>

              <View style={styles.carText}>
                <Text variant="bodyBold">C02 Emissions: </Text>
                <Text>
                  {data?.Co2Emissions}
                  {" "}
                  gCO2/km
                </Text>
              </View>

              <View style={styles.carText}>
                <Text variant="bodyBold">Colour: </Text>
                <Text>{data?.Colour}</Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ICEVehicle;

const styles = StyleSheet.create({
  container: {},

  carText: {
    flexDirection: "row",
    alignItems: "center",
  },
});
