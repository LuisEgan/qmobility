import { IIceVehicle, IVehicle } from "../Vehicle/Types";

enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
enum UserNetworkTypeEnum {
  QMOBILTY = "QMOBILTY",
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
  LINKEDIN = "LINKEDIN",
}
export interface IUser {
  name: string;
  email: string;
  id: string;
  role: UserRoleEnum;
  active: boolean;
  networkType: UserNetworkTypeEnum;
  createAt: Date;
  phone?: string;
  phoneCountryCode?: string;
  phoneCountry?: string;
  dateOfBirth?: Date;
  lastname?: string;
  updatedAt?: Date;
  deletedAt?: Date;
  password?: string;
  username?: string;
  recoveryPasswordToken?: string;
  avatarUrl?: string;
  vehicles?: IVehicle[];
  selectedVehicle?: IVehicle;
  random4digits?: number;
  iceVehicle: IIceVehicle;
}
