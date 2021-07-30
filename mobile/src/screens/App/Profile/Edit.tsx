import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { Header, Icons } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { IUpdateUser } from "../../../gql/User/mutations";
import EditForm, { IEditFormValues } from "./Forms/EditForm";
import { FullScreenModal } from "../../Feedback";
import { IIceVehicle } from "../../../gql/Vehicle/Types";
import { CountryApocope } from "../../../components/PhoneInput/Types";
import { cleanPhoneNumber } from "../../../lib/strings";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { AuthContext } from "../../../navigation/AuthContext";

const { height } = Dimensions.get("window");

// TODO set phone validation schema moving formik component
// TODO to the same component as the inputs
const editSchema = yup.object().shape({
  name: yup.string().required().trim(),
  lastname: yup.string().required().trim(),
  dateOfBirth: yup.string().required(),
});

const Edit = () => {
  const { navigate } = useNavigation();
  const { signOut } = useContext(AuthContext);

  const { data: userData, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [deleteAccount, { loading: deleteLoading }] = useMutation(
    User.mutations.deleteAccount,
  );

  const [updateUser, { loading: updateUserLoading }] = useMutation<
    { updateUser: IUpdateUser },
    IUpdateUser
  >(User.mutations.updateUser);

  const [iceVehicle, setIceVehicle] = useState<IIceVehicle | null>();

  const edit = async (values: IEditFormValues): Promise<void> => {
    const newIceVehicle = iceVehicle ? { ...iceVehicle } : null;

    if (newIceVehicle) {
      /* eslint-disable-next-line */
      delete newIceVehicle.__typename;
    }

    /* eslint-disable-next-line */
    const { carPlate, ...formValues } = values;

    const variables = iceVehicle !== undefined
      ? { ...formValues, iceVehicle: newIceVehicle }
      : { ...formValues };

    variables.selectedVehicle = +values.selectedVehicle;

    try {
      await updateUser({
        variables,
        refetchQueries: [
          {
            query: User.queries.allUserInfo,
          },
        ],
      });
    } catch (e) {
      // TODO e feedback display
    }
  };

  const onDeleteAccount = () => {
    Alert.alert(
      "Are you sure you want to delete your account?",
      "This is irreversible",
      [
        {
          text: "Yes",
          onPress: () => confirmDeleteAccount(),
        },
        {
          text: " no",
          style: "cancel",
        },
      ],
    );
  };

  const confirmDeleteAccount = async () => {
    try {
      const { data } = await deleteAccount();
      if (data) {
        if (data.deleteAccount) {
          signOut();
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (!userData) return <FullScreenModal show />;

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: userData.user.name,
          lastname: userData.user.lastname || "",
          dateOfBirth: userData.user.dateOfBirth || new Date(),
          avatarUrl: userData.user.avatarUrl || "",
          phone: cleanPhoneNumber(
            userData.user.phone || "",
            userData.user.phoneCountryCode,
          ),
          phoneCountryCode: userData.user.phoneCountryCode || "",
          phoneCountry: (userData.user.phoneCountry || "") as CountryApocope,
          carPlate: userData.user.iceVehicle?.VehiclePlate,
          selectedVehicle: userData.user.selectedVehicle?.Vehicle_ID || 0,
        }}
        onSubmit={edit}
        validationSchema={editSchema}
      >
        {(props) => (
          <>
            <Header
              title="Edit my Profile"
              text="Back"
              onPress={() => {
                if (!updateUserLoading) {
                  navigate(APP_STACK_SCREENS_NAMES.Profile);
                }
              }}
              textRight={`${updateUserLoading ? "Loading" : "Save"}`}
              onPressRight={props.handleSubmit}
              containerStyle={{
                backgroundColor: theme.colors.secondaryLighter,
              }}
            />
            <ScrollView style={styles.scrollStyle}>
              <EditForm
                {...props}
                loading={loading || updateUserLoading}
                onIceVehicleChange={(v) => setIceVehicle(v)}
                selectedVehicle={userData.user.selectedVehicle}
              />

              <View>
                <TouchableOpacity
                  onPress={() => onDeleteAccount()}
                  disabled={deleteLoading}
                  style={styles.deleteContainer}
                >
                  {!deleteLoading ? (
                    <>
                      <View style={styles.deleteContent}>
                        <Icons
                          icon="Delete"
                          fill={theme.colors.red}
                          size={20}
                        />
                      </View>
                      <Text variant="label" color={theme.colors.red}>
                        Delete Account
                      </Text>
                    </>
                  ) : (
                    <>
                      <ActivityIndicator color={theme.colors.red} />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </View>
  );
};
export default Edit;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
  },
  contentViewIput: {
    marginBottom: "10%",
  },
  scrollStyle: {
    height: height * 0.69,
    paddingHorizontal: "5%",
  },
  contentEmailStyle: {
    marginHorizontal: "5%",
  },
  textSelectStyle: {
    marginLeft: "5%",
    marginTop: 30,
    marginBottom: 10,
  },
  Card: {
    borderWidth: 1,
  },
  deleteContainer: {
    borderTopWidth: 1,
    flexDirection: "row",
    paddingVertical: 20,
    marginVertical: "5%",
    borderTopColor: theme.colors.grayLighter,
  },
  deleteContent: {
    marginRight: 10,
  },
});
