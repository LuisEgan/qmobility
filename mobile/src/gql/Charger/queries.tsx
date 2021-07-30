import { gql } from "@apollo/client";
import Address from "../../lib/Types/address";

export interface IChargeDeviceLocation {
  Latitude: string;
  Longitude: string;
  Address: Address;
  LocationShortDescription?: string;
  LocationLongDescription: string;
}

export interface ICharger {
  ChargeDeviceId?: string;
  ChargeDeviceRef?: string;
  ChargeDeviceName?: string;
  ChargeDeviceText?: string;
  ChargeDeviceManufacturer?: string;
  ChargeDeviceModel?: string;
  PublishStatusID?: string;
  DateCreated?: string;
  DateUpdated?: string;
  Attribution?: string;
  DateDeleted?: string;
  DeviceAccess: string[];
  DeviceNetworks?: string;
  ChargeDeviceStatus?: string;
  PublishStatus?: string;
  DeviceValidated?: string;
  RecordModerated?: string;
  RecordLastUpdated?: string;
  RecordLastUpdatedBy?: string;
  PaymentRequiredFlag: boolean;
  PaymentDetails?: string;
  SubscriptionRequiredFlag: boolean;
  SubscriptionDetails?: string;
  ParkingFeesFlag: boolean;
  ParkingFeesDetails?: string;
  ParkingFeesUrl?: string;
  AccessRestrictionFlag: boolean;
  AccessRestrictionDetails?: string;
  PhysicalRestrictionFlag: boolean;
  PhysicalRestrictionText?: string;
  OnStreetFlag: boolean;
  LocationType?: string;
  Bearing?: string;
  Accessible24Hours: boolean;
  ChargeDeviceLocation: IChargeDeviceLocation;
}

// * Search Router Recent
const getAllChargers = gql`
  {
    getAllChargers {
      ChargeDeviceLocation {
        Latitude
        Longitude
      }
    }
  }
`;

export default {
  getAllChargers,
};
