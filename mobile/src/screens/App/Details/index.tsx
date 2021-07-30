import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Icons, Slider } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { TIcon } from "../../../components/svg/icons/TypeIcons";
import slides from "./slides";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { FullScreenModal } from "../../Feedback";
import { kmToMiles } from "../../../lib/numbers";
import { numberWithDots } from "../../../lib/strings";
import { TDetailsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { IVehicle } from "../../../gql/Vehicle/Types";
import Vehicle from "../../../gql/Vehicle";
import { IGetVehicleVars } from "../../../gql/Vehicle/queries";
import { IUpdateSelectedVehicleVars } from "../../../gql/User/mutations";
import ModalChangeLoading from "../MapSearchDone/ModalChangeLoading";

const { height, width } = Dimensions.get("window");

interface IIconText {
  icon?: TIcon;
  label?: string;
}

type IDetails = TDetailsNavProps;

const Details = (props: IDetails) => {
  const { route } = props;

  const { goBack } = useNavigation();

  // * Queries
  const [
    getUserEve,
    { data: getUserEveData, loading: getUserEveLoading },
  ] = useLazyQuery<{ user: IUser }, IUser>(User.queries.getEve);

  const [getEve, { data: getEveData, loading: getEveLoading }] = useLazyQuery<
    { vehicle: IVehicle },
    IGetVehicleVars
  >(Vehicle.queries.getVehicle);

  const [bookTestDrive, { loading }] = useLazyQuery<{
    bookTestDrive: boolean;
  }>(User.queries.bookTestDrive);

  // * Mutations
  const [
    updateSelectedVehicle,
    { data: updateSelectedVehicleData, loading: updateSelectedVehicleLoading },
  ] = useMutation<{ updateUser: IUser }, IUpdateSelectedVehicleVars>(
    User.mutations.updateSelectedVehicle,
    {
      update(cache, { data }) {
        const allUserInfo = cache.readQuery<{ user: IUser }>({
          query: User.queries.allUserInfo,
        });

        const updatedUser = {
          ...allUserInfo?.user,
          selectedVehicle: data?.updateUser.selectedVehicle,
        };

        cache.writeQuery({
          query: User.queries.allUserInfo,
          data: {
            user: { ...updatedUser },
          },
        });
      },
    },
  );

  // * Fetch eVe
  useEffect(() => {
    if (route?.params?.vehicleID) {
      getEve({
        variables: {
          id: route?.params?.vehicleID,
        },
      });
    } else {
      getUserEve();
    }
  }, []);

  // * Set eVe
  useEffect(() => {
    if (getUserEveData || getEveData) {
      setEve(getUserEveData?.user.selectedVehicle || getEveData?.vehicle);
    }
  }, [getUserEveData, getEveData]);

  // * State
  const [eVe, setEve] = useState<IVehicle>();
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  // * Components
  const IconText = ({ icon, label }: IIconText) => (
    <View style={styles.iconTextContent}>
      {icon && (
        <View
          style={{
            marginRight: 5,
          }}
        >
          <Icons icon={icon} fill={theme.colors.grayLight} size={17} />
        </View>
      )}
      {label && <Text variant="label">{label}</Text>}
    </View>
  );

  // * Handlers
  const onBookTestDrive = async () => {
    try {
      setShowFeedback(true);
      bookTestDrive();
    } catch (error) {
      console.warn("error: ", error);
    }
  };

  const onSetAsDefault = async () => {
    try {
      updateSelectedVehicle({
        variables: { selectedVehicle: +(eVe?.Vehicle_ID || 0) },
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };

  if (getUserEveLoading || getEveLoading) return <FullScreenModal show />;

  return (
    <View style={styles.container}>
      <ModalChangeLoading stateModal={updateSelectedVehicleLoading} />

      <Alert
        btnEnabled={!loading}
        show={showFeedback}
        onClose={() => setShowFeedback(false)}
        text={loading ? "Loading..." : "Thanks! We'll contact you shortly."}
      />

      <View
        style={[
          styles.goBack,
          {
            backgroundColor: theme.colors.blackTransparent,
            justifyContent: "center",
            alignItems: "center",
            width: 30,
            height: 30,
            borderRadius: 30,
          },
        ]}
      >
        <Icons icon="ArrowBack" fill="white" size={20} onPress={goBack} />
      </View>

      <Slider
        slides={slides(eVe?.Images || [])}
        {...{ width, height: height * 0.4 }}
      />

      <ScrollView style={styles.containerScroll}>
        <View style={styles.contentTitle}>
          <Text variant="heading2">
            {eVe?.Vehicle_Make}
            {" "}
            {eVe?.Vehicle_Model}
          </Text>
        </View>

        <View style={styles.content}>
          <Text
            variant="bodyHighlightBold"
            style={{
              marginRight: 10,
            }}
          >
            eVe Battery
            {" "}
            {eVe?.Battery_Capacity_Full}
            {" "}
            kWh
          </Text>
          <Text variant="bodyBold">
            Range
            {kmToMiles(eVe?.Range_Real)}
            {" "}
            mi
          </Text>
        </View>

        <View style={[styles.content]}>
          <IconText icon="Bubble" label={`${eVe?.Misc_Seats}`} />
          <IconText icon="Spa" label="0 C02g/mi" />
        </View>

        <View style={[styles.content]}>
          <IconText
            icon="Polymer"
            label={`Max ${kmToMiles(eVe?.Range_Real)} mi`}
          />
          <IconText
            icon="Nature"
            label={`${eVe?.Efficiency_Real} kWh/${kmToMiles(100)} mi`}
          />
        </View>

        <View style={[styles.content]}>
          <IconText
            icon="Speed"
            label={`Max ${kmToMiles(eVe?.Performance_Topspeed)} mph`}
          />
          <IconText
            icon="Flash"
            label={`Time ${eVe?.Fastcharge_ChargeTime} mins`}
          />
        </View>

        <View style={[styles.content, { justifyContent: "space-between" }]}>
          <Text variant="bodyBold">United Kingdom</Text>
          <Text variant="bodyBold">
            £
            {" "}
            {numberWithDots(`${eVe?.Price_From_UK}`)}
          </Text>
        </View>

        <View style={[styles.content, { justifyContent: "space-between" }]}>
          <Text
            variant="body"
            style={{
              color: theme.colors.gray,
            }}
          >
            Available since
          </Text>
          <Text variant="body">{eVe?.Availability_Date_From}</Text>
        </View>

        <View>
          <Button
            containerStyle={{ marginVertical: 5 }}
            label="Set demo for me"
            onPress={onBookTestDrive}
            variant="primary"
          />
          <Button
            containerStyle={{ marginVertical: 5 }}
            label={
              updateSelectedVehicleData ? "eVe updated!" : "Set as default"
            }
            onPress={onSetAsDefault}
            enabled={
              !!route?.params?.vehicleID
              || !updateSelectedVehicleLoading
              || !updateSelectedVehicleData
            }
            variant={route?.params?.vehicleID ? "primary" : "default"}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.white,
  },
  containerScroll: {
    paddingHorizontal: "5%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: theme.colors.white,
    marginTop: -height * 0.01,
  },
  contentTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10%",
    marginBottom: "3%",
  },
  content: {
    flexDirection: "row",
    marginVertical: "3%",
  },
  goBack: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.03,
    zIndex: 1,
  },
  iconTextContent: {
    flexDirection: "row",
    marginVertical: "1%",
    marginRight: 15,
  },
  button: {
    marginHorizontal: "5%",
    marginBottom: "6%",
    marginTop: "3%",
    justifyContent: "center",
  },
});
