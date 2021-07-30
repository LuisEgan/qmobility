import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Header, Slider } from "../../../components";
import slides from "./slides";
import theme from "../../../config/Theme";
import { ESlide, ISlide } from "../../../components/Slider/Slide";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { IAnswers, allCardOptions, getRecommendedCategory } from "./options";
import Vehicle from "../../../gql/Vehicle";
import { FullScreenModal } from "../../Feedback";
import { IVehicleRecommendation } from "../../../gql/Vehicle/queries";
import { User } from "../../../gql";
import { IUpdateUser } from "../../../gql/User/mutations";
import OptionsSet from "./OptionsSet";

const { height, width } = Dimensions.get("window");

const ProfileScroll = () => {
  const { navigate } = useNavigation();

  const [
    vehicleRecommendation,
    { data: vehicleRecommendationData, loading: vehicleRecommendationLoading },
  ] = useLazyQuery<
    { vehicleRecommendation: IVehicleRecommendation[] },
    { category: string }
  >(Vehicle.queries.vehicleRecommendation);

  const [updateUser, { loading: updateUserLoading }] = useMutation<
    { updateUser: IUpdateUser },
    IUpdateUser
  >(User.mutations.updateUser);

  const [answers, setAnswers] = useState<IAnswers>({});

  // * Ask for recommended eVe with recommened categories from answers
  useEffect(() => {
    if (Object.keys(answers).length === slides.length) {
      vehicleRecommendation({
        variables: { category: getRecommendedCategory(answers) },
      });
    }
  }, [answers]);

  // * Get recommened eVe, update user's selectedVehicle,
  // * and navigate to CheckCar passing it as route prop
  useEffect(() => {
    const setSelectedVehicle = async (
      selectedVehicle: IVehicleRecommendation,
    ) => {
      try {
        const variables = {
          selectedVehicle: selectedVehicle.vehicle.Vehicle_ID,
        };

        await updateUser({
          variables,
          refetchQueries: [
            {
              query: User.queries.user,
            },
          ],
        });

        navigate(APP_STACK_SCREENS_NAMES.CheckCar, {
          vehicleRecommendation: selectedVehicle,
        });
      } catch (e) {
        // TODO e feedback display
      }
    };

    if (vehicleRecommendationData) {
      const { vehicleRecommendation: vehicle } = vehicleRecommendationData;
      setSelectedVehicle(vehicle[0]);
    }
  }, [vehicleRecommendationData]);

  const setSlides = (): ISlide[] =>
    slides.map((slide, index) => ({
      ...slide,
      outerCardComponent: (
        <OptionsSet
          question={slide.title || ""}
          options={allCardOptions[index]}
          {...{ answers, setAnswers }}
        />
      ),
    }));

  if (vehicleRecommendationLoading || updateUserLoading) return <FullScreenModal show />;

  return (
    <View style={styles.container}>
      <Header
        title="Create my Profile"
        subTitle="Add your personal traits"
        containerStyle={{
          backgroundColor: theme.colors.secondaryLighter,
        }}
      />

      <Slider
        type={ESlide.Cards}
        {...{ slides: setSlides(), width, height: height * 0.74 }}
      />
    </View>
  );
};
export default ProfileScroll;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
