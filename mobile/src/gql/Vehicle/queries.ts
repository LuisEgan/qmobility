import { gql } from "@apollo/client";
import { IVehicle } from "./Types";

export interface IGetVehicleVars {
  id: number;
}

const getVehicle = gql`
  query GetVehicle($id: Float!) {
    vehicle(id: $id) {
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
      Availability_Date_From
      Performance_Topspeed
      Fastcharge_ChargeTime
      Efficiency_Real
      Price_From_UK
      Misc_Seats
    }
  }
`;

const vehiclesMakes = gql`
  query VehiclesMakes {
    vehicleMakes
  }
`;

export interface IVehicleMakeModelsVars {
  Vehicle_Make: string;
}

export interface IVehicleMakeModels {
  Vehicle_ID: string;
  Vehicle_Model: string;
}

const vehicleMakeModels = gql`
  query VehicleMakeModels($Vehicle_Make: String) {
    vehicles(vehicleSearchInput: { Vehicle_Make: $Vehicle_Make }) {
      Vehicle_ID
      Vehicle_Model
    }
  }
`;

export interface IIceVehicleVars {
  plate: string;
}

const iceVehicle = gql`
  query SearchIceVehicle($plate: String!) {
    searchIceVehicle(plate: $plate) {
      Make
      MakeModel
      Co2Emissions
      YearMonthFirstRegistered
      FuelType
      SeatingCapacity
      Colour
      VehicleClass
      VehiclePlate
      DoorPlanLiteral
      MaxSpeedKph
      MaxSpeedMph
      ModelVariant
      EngineCapacity
    }
  }
`;

export interface IVehicleRecommendation {
  category: string;
  make: string;
  makeModel: string;
  vehicle: IVehicle;
}

const vehicleRecommendation = gql`
  query VehicleRecommendation($category: String!) {
    vehicleRecommendation(category: $category) {
      category
      make
      makeModel
      vehicle {
        Images
        Vehicle_ID
      }
    }
  }
`;

export interface IGetVehiclesVars {
  rangeMin: number;
  rangeMax: number;
  Vehicle_Make?: string;
  Vehicle_Model?: string;
  skip?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  seats?: number[];
  bodyType?: string[];
}

const getVehicles = gql`
  query getVehicles(
    $Vehicle_Make: String
    $Vehicle_Model: String
    $skip: Float
    $limit: Float
    $minPrice: Float
    $maxPrice: Float
    $seats: [Float!]
    $bodyType: [String!]
    $rangeMin: Float
    $rangeMax: Float
  ) {
    vehicles(
      vehicleSearchInput: {
        Vehicle_Make: $Vehicle_Make
        Vehicle_Model: $Vehicle_Model
        skip: $skip
        limit: $limit
        minPrice: $minPrice
        maxPrice: $maxPrice
        seats: $seats
        bodyType: $bodyType
        rangeMax: $rangeMax
        rangeMin: $rangeMin
      }
    ) {
      Vehicle_ID
      Vehicle_Make
      Vehicle_Model
      Vehicle_Model_Version
      Misc_Seats
      Range_Real
      Availability_Status
      Availability_Date_From
      id
      Price_From_UK
      Misc_Seats
      Misc_Body
      Images
    }
  }
`;

export default {
  getVehicle,
  vehiclesMakes,
  vehicleMakeModels,
  iceVehicle,
  vehicleRecommendation,
  getVehicles,
};
