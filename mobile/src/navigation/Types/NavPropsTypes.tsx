import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { LatLng, Region } from "react-native-maps";
import { IVehicleRecommendation } from "../../gql/Vehicle/queries";

type LoginSignUpFrom = 0 | 1;

// * Screens Props Types
type StackParamsList = {
  screen: Record<string, unknown>;
  Loading: {
    redirectTo: string;
  };
  LoginSignUp: {
    from: LoginSignUpFrom;
  };
  EmailConfirm: {
    userEmail: string;
    userToken?: string;
    userId?: string;
  };
  NewPassword: {
    userId: string;
  };
  CheckCar: {
    vehicleRecommendation: IVehicleRecommendation;
  };
  MapSearchDone: {
    location?: LatLng;
    origin: string;
    destination: string;
    initialLocation?: Region;
  };
  Details: {
    vehicleID?: number;
  };
};

// * Loading props
export type TLoadingNavProps = StackScreenProps<StackParamsList, "Loading">;

// * Terms and conditions props
export type TTCsNavProps = StackScreenProps<StackParamsList, "screen">;

// * Terms and conditions props
export type TAccessNavProps = StackScreenProps<StackParamsList, "screen">;

// * LoginSignUp Navigator props
type MaterialTopTabScreenState = {
  index: number;
  key: string;
};
type TLoginSignUpNavigation = StackNavigationProp<
  StackParamsList,
  "LoginSignUp"
>;
type TLoginSignUpRoute = RouteProp<StackParamsList, "LoginSignUp"> &
  MaterialTopTabScreenProps<StackParamsList, "LoginSignUp"> & {
    state: MaterialTopTabScreenState;
  };
export type TLoginSignUpNavProps = {
  navigation: TLoginSignUpNavigation;
  route: TLoginSignUpRoute;
};

// * Login and Sign up screens props
export type TLoginSignUpScreenProps = MaterialTopTabScreenProps<
  StackParamsList,
  "screen"
>;

// * Email Confirm screen props
export type TEmailConfirmNavProps = StackScreenProps<
  StackParamsList,
  "EmailConfirm"
>;

// * New Password screen props
export type TNewPasswordNavProps = StackScreenProps<
  StackParamsList,
  "NewPassword"
>;

// * My Cars screen props
export type TMyCarsNavProps = StackScreenProps<StackParamsList, "screen">;

// * Prodile Scroll sreen props
export type TProfileScrollNavProps = StackScreenProps<
  StackParamsList,
  "screen"
>;

// * Check Car sreen props
export type TCheckCarNavProps = StackScreenProps<StackParamsList, "CheckCar">;

// * My Routes sreen props
export type TMyRoutesNavProps = StackScreenProps<StackParamsList, "screen">;

// * Details screen props
export type TDetailsNavProps = StackScreenProps<StackParamsList, "Details">;

// * Activity - Stats screen props
export type TStatsNavProps = StackScreenProps<StackParamsList, "screen">;

// * MapSearchDone screen props
export type TMapSearchDoneNavProps = StackScreenProps<
  StackParamsList,
  "MapSearchDone"
>;

// * Export all types as one type
export type TAllNavProps = TLoadingNavProps &
  TTCsNavProps &
  TAccessNavProps &
  TLoginSignUpNavProps &
  TMyCarsNavProps &
  TDetailsNavProps &
  TProfileScrollNavProps &
  TCheckCarNavProps &
  TMyRoutesNavProps &
  TDetailsNavProps &
  TMapSearchDoneNavProps &
  TEmailConfirmNavProps &
  TStatsNavProps &
  TNewPasswordNavProps &
  TLoginSignUpScreenProps;
