import { Region } from "react-native-maps";

export const RANGE_MIN = 100;
export const RANGE_MAX = 250;
export const LIMIT_MAX = 10;

export const REGEX = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&"[\];',./{}|":?><`~°¬¡¿´]{8,}$/,
};

export const CATALOG_URI = "https://qmobility-catalog.vercel.app/";

export const ERRORS = {
  INVALID_EMAIL: "Invalid email address",
  INVALID_PASSWORD:
    "Must contain 8 characters, one number and one special character",
  WRONG_PASSWORD: "Wrong password",
  USER_NOT_FOUND: "User not found",
  REQUIRED: "Mandatory field",
  REQUIREDNUM: "Mandatory field or is not number",

  LOGIN_FAILED: "Login failed",
  EMPTY_EMAIL: "Please enter your email",
  EMPTY_PASSWORD: "Please enter your password",
  BAD_PIN: "Incorrect PIN",
};

export const AUTH_REDUCER_TYPES = {
  RESTORE_TOKEN: "RESTORE_TOKEN",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

export const ASYNC_STORAGE_ITEMS = {
  USER_TOKEN: "USER_TOKEN",
  HAS_ACCEPTED_TCS: "HAS_ACCEPTED_TCS",
  PHONE_COUNTRY: "PHONE_COUNTRY",
};

export const LOADING_STACK_SCREENS_NAMES = {
  Loading: "Loading",
};

export const AUTH_STACK_SCREENS_NAMES = {
  Onboarding: "Onboarding",
  TCs: "Terms and conditions",
  Access: "Access",
  Login: "Login",
  SignUp: "SignUp",
  LoginSignUp: "LoginSignUp",
  EmailConfirm: "EmailConfirm",
  EmailPrompt: "EmailPrompt",
  NewPassword: "NewPassword",
};

export const APP_STACK_SCREENS_NAMES = {
  Loading: "Loading",
  Activty: "Activty",
  CreateProfile: "CreateProfile",
  MyCars: "MyCars",
  ProfileScroll: "ProfileScroll",
  CheckCar: "CheckCar",
  Main: "Main",
  SearchRouter: "SearchRouter",
  EditProfile: "EditProfile",
  Profile: "Profile",
  MyRoutes: "MyRoutes",
  Details: "Details",
  DetailsICE: "DetailsICE",
  MapSearchDone: "MapSearchDone",
  MyMatch: "MyMatch",
};

export const UK_REGION: Region = {
  latitude: 54.776366,
  longitude: -5.344845,
  latitudeDelta: 5.5,
  longitudeDelta: 5.5,
};
