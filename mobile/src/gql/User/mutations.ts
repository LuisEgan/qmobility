import { gql } from "@apollo/client";
import { LinkedInToken } from "react-native-linkedin";
import { IIceVehicle } from "../Vehicle/Types";

export interface IAuthResponse {
  accessToken: string;
}
export interface ISocialNetworkVars {
  accessToken: string | LinkedInToken;
}

export interface IEmailSignUpVars {
  email: string;
  password: string;
}

export interface ILoginVars {
  email: string;
  password: string;
}

// * Login
const login = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

// * Facebook Login
const loginWithFacebook = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(facebookLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Google Login
const loginWithGoogle = gql`
  mutation LoginWithGoogle($accessToken: String!) {
    loginWithGoogle(googleLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * LinkedIn Login
const loginWithLinkedIn = gql`
  mutation LoginWithLinkedIn($accessToken: String!) {
    loginWithLinkedIn(linkedinLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Apple Login
const loginWithApple = gql`
  mutation LoginWithApple($accessToken: String!) {
    loginWithApple(appleLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

export interface IEmailConfirmationVars {
  email: string;
  random4digits: number;
}

export interface IResendEmailVars {
  email: string;
}

// * Email sign up
const signUp = gql`
  mutation EmailSignUp($email: String!, $password: String!) {
    signup(signUpInput: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

const emailConfirmation = gql`
  mutation EmailConfirmation($email: String!, $random4digits: Float!) {
    emailConfirmation(
      emailConfirmationInput: { email: $email, random4digits: $random4digits }
    )
  }
`;

const resendEmailConfirmation = gql`
  mutation ResendEmailConfirmation($email: String!) {
    reSendEmailConfirmation(email: $email)
  }
`;

// * Update User
export interface IUpdateUser {
  name?: string;
  lastname?: string;
  dateOfBirth?: Date;
  email?: string;
  phone?: string;
  phoneCountryCode?: string;
  phoneCountry?: string;
  selectedVehicle?: number;
  avatarUrl?: string;
  iceVehicle?: IIceVehicle | null;
}

const updateUser = gql`
  mutation UpdateUser(
    $name: String
    $lastname: String
    $email: String
    $phone: String
    $phoneCountryCode: String
    $phoneCountry: String
    $username: String
    $avatarUrl: String
    $dateOfBirth: DateTime
    $selectedVehicle: Float
    $iceVehicle: IceVehicle
  ) {
    updateUser(
      updateProfileInput: {
        name: $name
        lastname: $lastname
        email: $email
        phone: $phone
        phoneCountryCode: $phoneCountryCode
        phoneCountry: $phoneCountry
        username: $username
        avatarUrl: $avatarUrl
        dateOfBirth: $dateOfBirth
        selectedVehicle: $selectedVehicle
        iceVehicle: $iceVehicle
      }
    ) {
      id
      name
      avatarUrl
      dateOfBirth
      lastname
      phone
      phoneCountryCode
      phoneCountry
    }
  }
`;

// * Password reset
export interface IChangePasswordReset {
  id: string;
}
export interface IChangePasswordResetVars {
  email: string;
}
const changePasswordRequest = gql`
  mutation ChangePasswordRequest($email: String!) {
    changePasswordRequest(changePasswordRequestInput: { email: $email }) {
      id
    }
  }
`;

export interface IValidateTokenVars {
  userId: string;
  token: string;
}
const validateToken = gql`
  mutation ValidateToken($userId: String!, $token: String!) {
    validateToken(validateTokenInput: { userId: $userId, token: $token })
  }
`;

export interface IChangePasswordVars {
  userId: string;
  password: string;
}

const changePassword = gql`
  mutation ChangePassword($userId: String!, $password: String!) {
    changePassword(
      changePasswordInput: { userId: $userId, password: $password }
    ) {
      id
    }
  }
`;

export interface IUpdateSelectedVehicleVars {
  selectedVehicle: number;
}
const updateSelectedVehicle = gql`
  mutation UpdateSelectedVehicle($selectedVehicle: Float) {
    updateUser(updateProfileInput: { selectedVehicle: $selectedVehicle }) {
      selectedVehicle {
        Vehicle_ID
        Images
        Vehicle_Make
        Vehicle_Model
        Vehicle_Model_Version
        Battery_Capacity_Useable
        Battery_Capacity_Full
        Battery_Capacity_Estimate
        Range_Real
        Availability_Status
        Performance_Topspeed
        Fastcharge_ChargeTime
        Efficiency_Real
        Price_From_UK
      }
    }
  }
`;

const deleteAccount = gql`
  mutation DeleteAccount {
    deleteAccount
  }
`;

export default {
  login,
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  loginWithApple,
  signUp,
  emailConfirmation,
  resendEmailConfirmation,
  updateUser,
  changePasswordRequest,
  validateToken,
  changePassword,
  updateSelectedVehicle,
  deleteAccount,
};
