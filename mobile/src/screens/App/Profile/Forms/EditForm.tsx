import { useLazyQuery, useQuery } from "@apollo/client";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import {
  ImageProfile,
  Input,
  PhoneInput,
  Select,
} from "../../../../components";
import DatePicker from "../../../../components/DatePicker";
import ICEVehicle from "../../../../components/ICEVehicle";
import { CountryApocope } from "../../../../components/PhoneInput/Types";
import theme, { Text } from "../../../../config/Theme";
import Vehicle from "../../../../gql/Vehicle";
import {
  IVehicleMakeModels,
  IVehicleMakeModelsVars,
} from "../../../../gql/Vehicle/queries";
import { IIceVehicle, IVehicle } from "../../../../gql/Vehicle/Types";
import { ERRORS } from "../../../../lib/constants";
import { upperCaseFormatter } from "../../../../lib/strings";

export interface IEditFormValues {
  name: string;
  lastname: string;
  dateOfBirth: Date;
  avatarUrl: string;
  phone: string;
  phoneCountryCode: string;
  phoneCountry: CountryApocope;
  carPlate: string;
  selectedVehicle: number;
}

type TVehicleID = string;
interface IVehicleModelsListOptions {
  [model: string]: TVehicleID;
}

interface IForm extends FormikProps<IEditFormValues> {
  loading?: boolean;
  onIceVehicleChange: (vehicle: IIceVehicle | undefined | null) => void;
  selectedVehicle?: IVehicle;
}

const EditForm = (props: IForm) => {
  const {
    handleChange,
    handleBlur,
    setErrors,
    onIceVehicleChange,
    errors,
    touched,
    values,
    initialValues,
    selectedVehicle,
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

  const {
    data: vehicleMakeModelsData,
    loading: vehicleMakeModelsLoading,
    refetch: vehicleMakeModels,
  } = useQuery<
    {
      vehicles: IVehicleMakeModels[];
    },
    IVehicleMakeModelsVars
  >(Vehicle.queries.vehicleMakeModels, {
    variables: {
      Vehicle_Make: selectedVehicle?.Vehicle_Make || "",
    },
  });

  const { data: vehicleMakes } = useQuery<{ vehicleMakes: [string] }>(
    Vehicle.queries.vehiclesMakes,
  );

  const [vehicleMake, setVehicleMake] = useState<string>(
    selectedVehicle?.Vehicle_Make || "",
  );

  const [vehicleModels, setVehicleModels] = useState<IVehicleModelsListOptions>(
    {},
  );
  const [vehicleModel, setVehicleModel] = useState<string>(
    selectedVehicle?.Vehicle_Model || "",
  );

  // * Update ICE Vehicle for parent
  useEffect(() => {
    if (searchIceVehicleCalled) {
      onIceVehicleChange(searchIceVehicleData?.searchIceVehicle || null);
    }
  }, [searchIceVehicleData, searchIceVehicleCalled]);

  // * Update Vehicle Models list
  useEffect(() => {
    if (vehicleMakeModelsData) {
      const models: IVehicleModelsListOptions = {};
      vehicleMakeModelsData?.vehicles?.forEach((v) => {
        if (!models[v.Vehicle_Model]) {
          models[v.Vehicle_Model] = v.Vehicle_ID;
        }
      });
      setVehicleModels(models);
    }
  }, [vehicleMakeModelsData]);

  const onLoadPhoto = async (photoB64: string) => {
    handleChange("avatarUrl")(photoB64);
  };

  // * Vehicles handlers
  const onCarPlateChange = async (plate: string) => {
    if (plate.length >= 5) {
      searchIceVehicle({
        variables: {
          plate,
        },
      });
      handleChange("carPlate")(plate);
    }
  };

  const onVehicleMakeChange = (make: string) => {
    setVehicleMake(make);
    setVehicleModel("");
    vehicleMakeModels({
      Vehicle_Make: make,
    });
  };

  const onVehicleModelChange = (model: string) => {
    setVehicleModel(model);
    handleChange("selectedVehicle")(`${vehicleModels[model]}`);
  };

  return (
    <View style={styles.container}>
      <ImageProfile
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

        <PhoneInput
          phone={initialValues.phone}
          phoneCountryCode={initialValues.phoneCountryCode || "44"}
          phoneCountry={initialValues.phoneCountry || "GB"}
          onChangeFormattedText={({
            phone,
            phoneCountryCode,
            phoneCountry,
          }) => {
            if (phone) handleChange("phone")(phone);
            if (phoneCountryCode) handleChange("phoneCountryCode")(phoneCountryCode);
            if (phoneCountry) handleChange("phoneCountry")(phoneCountry);
          }}
          error={errors.phone}
          onIsInvalid={() => setErrors({ ...errors, phone: "Invalid Phone" })}
        />

        <View style={styles.containerTtitleEdition}>
          <Text variant="label">YOUR VIRTUAL EVE</Text>
        </View>

        <Select
          placeholder="Select vehicle make"
          onPress={(e) => onVehicleMakeChange(`${e}`)}
          list={vehicleMakes?.vehicleMakes || []}
          value={vehicleMake}
        />

        {vehicleMakeModelsLoading ? (
          <ActivityIndicator />
        ) : (
          <Select
            placeholder="Select vehicle model"
            onPress={(e) => onVehicleModelChange(`${e}`)}
            list={Object.keys(vehicleModels)}
            value={vehicleModel}
          />
        )}

        <View style={styles.containerTtitleEdition}>
          <Text variant="label">YOUR ICE VEHICLE</Text>
        </View>

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
          defaultValue={initialValues.carPlate}
        />
      </View>
    </View>
  );
};

export default EditForm;

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
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
});
