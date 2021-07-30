import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Modal, Select, Input, Icons } from "../../../components";
import theme, { Text } from "../../../config/Theme";

import { ERRORS } from "../../../lib/constants";
import {
  ISaveMyRoutes,
  ISaveMyRoutesVar,
  IUpdateMyRoutesVar,
  IUpdataMyRoutes,
} from "../../../gql/Route/mutations";
import { Route, User } from "../../../gql";

const { height, width } = Dimensions.get("window");

const routeFormSchema = yup.object().shape({
  name: yup.string().required("Required"),
  category: yup.string().required("Required"),
  frequency: yup.number().required().min(0).integer()
    .required("Required"),
});

export interface IModalSaveRoute {
  stateModal?: boolean;
  onClosed?: () => void;
  isEdit?: boolean;

  startLocation: string;
  endLocation: string;

  kwh: number;
  totalDistance: number;
  totalTime: number;

  carId?: number;

  id?: string;
  categoryOld?: string;
  friendlyNameOld?: string;
  frequencyOld?: string;

  label?: string;
}

export interface IFormValuesModalSaveRoute {
  name: string;
  category: string;
  frequency: string;
}

const OPTIONCATEGORY: string[] = [
  "Commute",
  "Local household",
  "Weekend Away",
  "Annual Break",
];

const validationText = (str: string): string => {
  if (str === "") return " ";

  if (str === "Commute" || str === "Local household") {
    return "time per week";
  }
  return "time per year";
};

const ModalSaveRoute = (props: IModalSaveRoute) => {
  const {
    stateModal,
    onClosed,
    isEdit,

    startLocation,
    endLocation,
    kwh,
    totalDistance,
    totalTime,
    carId,

    id,
    categoryOld,
    friendlyNameOld,
    frequencyOld,

    label = "Save your route",
  } = props;

  const [upSaveMyRoutes, { loading: upSaveMyRoutesLoading }] = useMutation<
    { upSaveMyRoutes: ISaveMyRoutes },
    ISaveMyRoutesVar
  >(Route.mutations.saveMyRoute, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: Route.queries.getMySaveRoute,
      },
      {
        query: User.queries.getMyStats,
      },
    ],
  });

  const [updateMyRoutes, { loading: updateMyRoutesLoading }] = useMutation<
    { updateMyRoutes: IUpdataMyRoutes },
    IUpdateMyRoutesVar
  >(Route.mutations.updateMyRoute, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: Route.queries.getMySaveRoute,
      },
      {
        query: User.queries.getMyStats,
      },
    ],
  });

  const [statePhase, setStatePhase] = useState<boolean>(true);
  const [isSavedRoute, setIsSavedRoute] = useState<boolean>(false);
  const [valueSave, setValueSave] = useState<IFormValuesModalSaveRoute>({
    name: friendlyNameOld || "",
    category: categoryOld || "",
    frequency: frequencyOld || "",
  });

  const onSaveRoute = (values: IFormValuesModalSaveRoute): void => {
    setValueSave(values);
    setStatePhase(!statePhase);
  };

  const onValidationType = () => {
    if (isEdit) {
      onEditionRouter();
    } else {
      onSaveMyRouter();
    }
  };

  const onEditionRouter = async () => {
    const { name, category, frequency } = valueSave;
    const obj: IUpdateMyRoutesVar = {
      myRouteId: id || "",
      frequency,
      friendlyName: name,
      category,
    };

    try {
      const updateMyRouteData = await updateMyRoutes({
        variables: { ...obj },
      });

      setIsSavedRoute(true);
      if (updateMyRouteData) {
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    } catch (error) {
      console.warn("onEditionRouter -> error", error);
    }
  };

  const onSaveMyRouter = async () => {
    const { name, category, frequency } = valueSave;
    const newFrequecy = `${frequency} ${validationText(category)}`;
    try {
      const obj = {
        origin: startLocation,
        destination: endLocation,
        friendlyName: name,
        category,
        frequency: newFrequecy,
        kwh: +kwh,
        totalDistance: +totalDistance,
        totalTime: +totalTime,
        carId: +(carId || 0),
      };

      const upSaveMyRouteData = await upSaveMyRoutes({
        variables: { ...obj },
      });

      setIsSavedRoute(true);
      if (upSaveMyRouteData) {
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    } catch (error) {
      console.warn("onSaveMyRouter -> error", error);
    }
  };

  const onCancel = () => {
    setStatePhase(true);
    setIsSavedRoute(false);
    if (onClosed) onClosed();
  };

  const setFrequencyInputValue = (value: string) =>
    (value.includes("time") ? +value.split("time")[0].trim() : +value.trim());

  const Form = (params: FormikProps<IFormValuesModalSaveRoute>) => {
    const {
      handleSubmit,
      handleBlur,
      setFieldValue,
      errors,
      touched,
      values,
    } = params;

    let nextText = "CONTINUE";

    if (!statePhase) {
      nextText = isSavedRoute ? "SAVED!" : "SAVE ROUTE";
    }

    return (
      <>
        <View style={styles.bodyModal}>
          {statePhase ? (
            <ScrollView
              contentContainerStyle={{
                flex: 1,
              }}
            >
              <Input
                placeholder="Name"
                value={values.name}
                onChange={(str) => setFieldValue("name", str.toString())}
                onBlur={() => handleBlur("name")}
                error={errors.name && ERRORS.REQUIRED}
                touched={touched.name}
                containerStyle={styles.inputContent}
                inputStyle={styles.input}
              />

              <Select
                placeholder="Category"
                list={OPTIONCATEGORY}
                value={values.category}
                onPress={(str) => setFieldValue("category", str.toString())}
                containerStyle={styles.selectContent}
                error={errors.category && ERRORS.REQUIRED}
                touched={touched.category}
              />

              <Input
                placeholder="frequency"
                isNumber
                value={`${setFrequencyInputValue(values.frequency) || ""}`}
                onChange={(str) => setFieldValue("frequency", str.toString())}
                onBlur={() => handleBlur("frequency")}
                error={errors.frequency && ERRORS.REQUIREDNUM}
                touched={touched.frequency}
                containerStyle={styles.inputContent}
                inputStyle={[styles.input, { width: width * 0.5 }]}
                text={validationText(values.category)}
              />
            </ScrollView>
          ) : (
            <PhaseTwo />
          )}
        </View>
        <View style={styles.contentButtonModal}>
          <TouchableOpacity
            onPress={() =>
              (statePhase ? onCancel() : setStatePhase(!statePhase))}
          >
            <Text
              style={{
                color: theme.colors.grayLight,
              }}
              variant="bodyBold"
            >
              {statePhase ? "CANCEL" : "BACK"}
            </Text>
          </TouchableOpacity>
          {!upSaveMyRoutesLoading || updateMyRoutesLoading ? (
            <TouchableOpacity
              onPress={statePhase ? handleSubmit : onValidationType}
            >
              <Text
                variant="bodyBold"
                style={{
                  color: theme.colors.white,
                }}
              >
                {nextText}
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </>
    );
  };

  const PhaseTwo = () => {
    const { name, category, frequency } = valueSave;
    return (
      <>
        <View style={styles.containerPhaseTwo}>
          <Icons icon="Domain" fill={theme.colors.primary} />
          <View>
            <View style={styles.contentPheseTwo}>
              <Text
                style={styles.textColor}
                numberOfLines={1}
                variant="heading1"
              >
                {name}
              </Text>

              <Text style={styles.textColor} variant="body" numberOfLines={3}>
                {startLocation}
                ,
                {endLocation}
              </Text>
            </View>

            <View style={styles.contentPheseTwo}>
              <Text
                style={styles.textColor}
                numberOfLines={1}
                variant="heading1"
              >
                {category}
              </Text>
              <View>
                <Text style={styles.textColor} variant="body" numberOfLines={3}>
                  {`${frequency} ${validationText(category)}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const ContentBody = () => (
    <Formik
      enableReinitialize
      initialValues={valueSave}
      onSubmit={onSaveRoute}
      validationSchema={routeFormSchema}
    >
      {Form}
    </Formik>
  );

  const onClosedValidation = () => {
    if (onClosed) onCancel();
  };

  return (
    <Modal state={stateModal || false} onClosed={() => onClosedValidation()}>
      <View style={styles.containerModal}>
        <TouchableOpacity activeOpacity={1} style={styles.contentModal}>
          <View>
            <Text
              variant="heading2"
              style={[
                {
                  color: theme.colors.white,
                },
                styles.titleModal,
              ]}
            >
              {label}
            </Text>
          </View>
          <ContentBody />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalSaveRoute;

const styles = StyleSheet.create({
  containerModal: {
    marginVertical: height * (Platform.OS === "ios" ? 0.3 : 0.2),
  },
  contentModal: {
    height: 400,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: theme.colors.secondaryDark,
  },
  titleModal: {
    alignSelf: "center",
    marginVertical: "5%",
  },
  bodyModal: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  contentButtonModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
  },
  inputContent: {
    borderRadius: 10,
    paddingLeft: 5,
    height: 50,
    backgroundColor: theme.colors.white,
  },
  input: {
    borderBottomWidth: 0,
    marginTop: -8,
  },
  selectContent: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
  containerPhaseTwo: {
    flexDirection: "row",
    flex: 1,
    paddingRight: "10%",
  },
  contentPheseTwo: {
    flex: 1,
  },
  textColor: {
    color: theme.colors.white,
  },
  contentFrequency: {
    flexDirection: "row",
  },
  contentText: {
    flex: 0.5,
    justifyContent: "center",
  },
  text: {
    color: theme.colors.white,
    textAlign: "center",
  },
});
