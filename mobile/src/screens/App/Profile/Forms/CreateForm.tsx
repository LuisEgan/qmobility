import { useLazyQuery } from "@apollo/client";
import { FormikProps } from "formik";
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button, ImageProfile, Input } from "../../../../components";
import DatePicker from "../../../../components/DatePicker";
import ICEVehicle from "../../../../components/ICEVehicle";
import theme, { Text } from "../../../../config/Theme";
import Vehicle from "../../../../gql/Vehicle";
import { IIceVehicle } from "../../../../gql/Vehicle/Types";
import { ERRORS } from "../../../../lib/constants";
import { upperCaseFormatter } from "../../../../lib/strings";

const { width, height } = Dimensions.get("window");

export interface ICreateFormValues {
  name: string;
  lastname: string;
  dateOfBirth: Date;
  avatarUrl: string;
}

interface IForm extends FormikProps<ICreateFormValues> {
  loading?: boolean;
  onIceVehicleChange: (vehicle: IIceVehicle) => void;
}

const CreateForm = (props: IForm) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    onIceVehicleChange,
    errors,
    touched,
    values,
    initialValues,
    loading,
  } = props;

  const [
    searchIceVehicle,
    {
      data: searchIceVehicleData,
      loading: searchIceVehicleLoading,
      called: searchIceVehicleCalled,
      error: searchIceVehicleError,
    },
  ] = useLazyQuery<{ searchIceVehicle: IIceVehicle }>(
    Vehicle.queries.iceVehicle,
  );

  // * Update ICE Vehicle for parent
  useEffect(() => {
    if (searchIceVehicleData) {
      onIceVehicleChange(searchIceVehicleData.searchIceVehicle);
    }
  }, [searchIceVehicleData]);

  const onLoadPhoto = async (photoB64: string) => {
    handleChange("avatarUrl")(photoB64);
  };

  const onCarPlateChange = async (plate: string) => {
    if (plate.length >= 5) {
      searchIceVehicle({
        variables: {
          plate,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.scrollStyle,
          { backgroundColor: theme.colors.backgroundLighter },
        ]}
      >
        <ImageProfile
          label="JD"
          color={theme.colors.primary}
          onLoadPhoto={onLoadPhoto}
          avatarUrl={values.avatarUrl}
        />

        <View style={styles.contentViewIput}>
          <Input
            label="First name"
            placeholder="First name"
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name && ERRORS.REQUIRED}
            touched={touched.name}
            defaultValue={initialValues.name}
          />

          <Input
            label="Last name"
            placeholder="Last name"
            onChange={handleChange("lastname")}
            onBlur={handleBlur("lastname")}
            error={errors.lastname && ERRORS.REQUIRED}
            touched={touched.lastname}
            defaultValue={initialValues.lastname}
          />

          <DatePicker
            label="Date of birth"
            onChange={(e) => handleChange("dateOfBirth")(e.toString())}
            value={values.dateOfBirth || initialValues.dateOfBirth}
          />

          <Text style={styles.textSelectStyle} variant="bodyHighlight">
            Enter your diesel / petrol car&apos;s plate
          </Text>

          {searchIceVehicleCalled && (
            <ICEVehicle
              loading={searchIceVehicleLoading}
              error={searchIceVehicleError}
              data={searchIceVehicleData?.searchIceVehicle}
            />
          )}

          <Input
            label="Car plate"
            placeholder="Y0UR PL4T3"
            onChange={onCarPlateChange}
            onBlur={handleBlur("carPlate")}
            formatter={upperCaseFormatter}
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: theme.colors.backgroundLighter },
        ]}
      >
        <Button
          label={`${loading ? "LOADING..." : "DONE"}`}
          variant="primary"
          onPress={handleSubmit}
          containerStyle={styles.button}
          enabled={!loading}
        />
      </View>
    </View>
  );
};

export default CreateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 40,
    padding: 10,
  },
  contentViewIput: {
    marginBottom: "10%",
  },
  scrollStyle: {
    flex: 1,
    padding: "5%",
  },
  contentEmailStyle: {
    marginHorizontal: "5%",
  },
  textSelectStyle: {
    marginTop: 30,
    marginBottom: 10,
  },

  buttonContainer: {
    height: height * 0.12,
    justifyContent: "center",
    alignItems: "center",
  },
  button: { marginHorizontal: "10%", width: width * 0.8 },

  carText: {
    flexDirection: "row",
    alignItems: "center",
  },
});
