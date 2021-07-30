import { gql } from "@apollo/client";

const user = gql`
  query User {
    user {
      id
      name
      lastname
      dateOfBirth
      avatarUrl
      email
      createAt
    }
  }
`;

const allUserInfo = gql`
  query AllUserInfo {
    user {
      id
      name
      lastname
      dateOfBirth
      avatarUrl
      email
      phone
      phoneCountryCode
      phoneCountry
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
      iceVehicle {
        Make
        MakeModel
        Co2Emissions
        YearMonthFirstRegistered
        FuelType
        SeatingCapacity
        Colour
        VehicleClass
        VehiclePlate
      }
    }
  }
`;

const getEve = gql`
  query GetEve {
    user {
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
        Availability_Date_From
        Performance_Topspeed
        Fastcharge_ChargeTime
        Efficiency_Real
        Price_From_UK
        Misc_Seats
      }
    }
  }
`;

const getICEVehicle = gql`
  query GetICEVehicle {
    user {
      iceVehicle {
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
  }
`;

const bookTestDrive = gql`
  query BookTestDrive {
    bookTestDrive
  }
`;

export interface IMyStats {
  anualTotalMilles: number;
  averageTripLength: number;
  maxTripLength: number;
  minTripLength: number;
  totalTimeInCar: number;
  idleTimeOfCar: number;
  idlePercentageOfCar: number;
  weeklyAverageMiles: number;
  dailyAverageMiles: number;
  minRangeRequirement: number;
  maxRangeRequirement: number;
  totalCo2Saved: number;
  treesSaved: number;
}

const getMyStats = gql`
  query MyStats {
    getMyStats {
      anualTotalMilles
      averageTripLength
      maxTripLength
      minTripLength
      totalTimeInCar
      idleTimeOfCar
      idlePercentageOfCar
      weeklyAverageMiles
      dailyAverageMiles
      minRangeRequirement
      maxRangeRequirement
      totalCo2Saved
      treesSaved
    }
  }
`;

export default {
  user,
  allUserInfo,
  getEve,
  bookTestDrive,
  getICEVehicle,
  getMyStats,
};
