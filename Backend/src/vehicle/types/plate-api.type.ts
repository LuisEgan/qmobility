export class ExtraInformation {}

export class BillingAccount {
  AccountType: string;
  AccountBalance: number;
  TransactionCost: number;
  ExtraInformation: ExtraInformation;
}

export class TechnicalSupport {
  ServerId: string;
  RequestId: string;
  QueryDurationMs: number;
  SupportDate: string;
  SupportTime: string;
  SupportCode: string;
}

export class DataKeys {
  Vrm: string;
}

export class Request {
  RequestGuid: string;
  PackageId: string;
  PackageVersion: number;
  ResponseVersion: number;
  DataKeys: DataKeys;
}

export class Lookup {
  StatusCode: string;
  StatusMessage: string;
  AdviceTextList: any[];
}

export class StatusInformation {
  Lookup: Lookup;
}

export class Dimensions {
  UnladenWeight?: any;
  RigidArtic: string;
  BodyShape: string;
  PayloadVolume?: any;
  PayloadWeight?: any;
  Height: number;
  NumberOfDoors: number;
  NumberOfSeats: number;
  KerbWeight: number;
  GrossTrainWeight?: any;
  FuelTankCapacity: number;
  LoadLength?: any;
  DataVersionNumber?: any;
  WheelBase: number;
  CarLength: number;
  Width: number;
  NumberOfAxles: number;
  GrossVehicleWeight: number;
  GrossCombinedWeight?: any;
}

export class EuroNcap {
  Child: number;
  Adult: number;
  Pedestrian: number;
}

export class Safety {
  EuroNcap: EuroNcap;
}

export class Engine {
  FuelCatalyst: string;
  Stroke: number;
  PrimaryFuelFlag: string;
  ValvesPerCylinder: number;
  Aspiration: string;
  FuelSystem: string;
  NumberOfCylinders: number;
  CylinderArrangement: string;
  ValveGear: string;
  Location: string;
  Description: string;
  Bore: number;
  Make: string;
  FuelDelivery: string;
}

export class ElectricVehicleBattery {
  Capacity?: any;
  ChargePort?: any;
  ChargeTime?: any;
  Type?: any;
}

export class General {
  Engine: Engine;
  PowerDelivery: string;
  TypeApprovalCategory: string;
  ElectricVehicleBattery: ElectricVehicleBattery;
  SeriesDescription: string;
  DriverPosition: string;
  DrivingAxle: string;
  DataVersionNumber?: any;
  EuroStatus: string;
  IsLimitedEdition: boolean;
}

export class Torque {
  FtLb: number;
  Nm: number;
  Rpm: number;
}

export class Power {
  Bhp: number;
  Rpm: number;
  Kw: number;
}

export class MaxSpeed {
  Kph: number;
  Mph: number;
}

export class Acceleration {
  Mph: number;
  Kph?: any;
  ZeroTo60Mph: number;
  ZeroTo100Kph?: any;
}

export class Performance {
  Torque: Torque;
  NoiseLevel?: any;
  DataVersionNumber?: any;
  Power: Power;
  MaxSpeed: MaxSpeed;
  Co2: number;
  Particles?: any;
  Acceleration: Acceleration;
}

export class ExtraUrban {
  Lkm: number;
  Mpg: number;
}

export class UrbanCold {
  Lkm: number;
  Mpg: number;
}

export class Combined {
  Lkm: number;
  Mpg: number;
}

export class Consumption {
  ExtraUrban: ExtraUrban;
  UrbanCold: UrbanCold;
  Combined: Combined;
}

export class TechnicalDetails {
  Dimensions: Dimensions;
  Safety: Safety;
  General: General;
  Performance: Performance;
  Consumption: Consumption;
}

export class Mvris {
  ModelCode: string;
  MakeCode: string;
}

export class Smmt {
  Make: string;
  Mvris: Mvris;
  Trim: string;
  Range: string;
}

export class Dvla {
  Model: string;
  Make: string;
}

export class ClassificationDetails {
  Smmt: Smmt;
  Dvla: Dvla;
}

export class FirstYear {
  SixMonth: number;
  TwelveMonth: number;
}

export class YearTwoToSix {
  TwelveMonth?: any;
  SixMonth?: any;
}

export class PremiumVehicle {
  YearTwoToSix: YearTwoToSix;
}

export class Standard {
  SixMonth: number;
  TwelveMonth: number;
}

export class VedRate {
  FirstYear: FirstYear;
  PremiumVehicle: PremiumVehicle;
  Standard: Standard;
}

export class MotVed {
  VedRate: VedRate;
  VedCo2Emissions: number;
  MotDue?: any;
  VedBand: string;
  VedCo2Band: string;
  TaxDue?: any;
  Message?: any;
  VehicleStatus?: any;
}

export class VehicleStatus {
  MotVed: MotVed;
}

export class V5CCertificateList {
  CertificateDate: Date;
}

export class KeeperChangesList {
  DateOfTransaction: Date;
  NumberOfPreviousKeepers: number;
  DateOfLastKeeperChange: Date;
}

export class VehicleHistory {
  V5CCertificateCount: number;
  PlateChangeCount: number;
  NumberOfPreviousKeepers: number;
  V5CCertificateList: V5CCertificateList[];
  KeeperChangesCount: number;
  VicCount: number;
  ColourChangeCount?: any;
  ColourChangeList?: any;
  KeeperChangesList: KeeperChangesList[];
  PlateChangeList?: any;
  VicList?: any;
}

export class VehicleRegistration {
  DateOfLastUpdate: Date;
  Colour: string;
  VehicleClass: string;
  CertificateOfDestructionIssued?: string;
  EngineNumber: string;
  EngineCapacity: string;
  TransmissionCode: string;
  Exported: boolean;
  YearOfManufacture: string;
  WheelPlan?: string;
  DateExported?: string;
  Scrapped: boolean;
  Transmission: string;
  DateFirstRegisteredUk: Date;
  Model: string;
  GearCount: number;
  ImportNonEu: boolean;
  PreviousVrmGb?: string;
  GrossWeight: number;
  DoorPlanLiteral: string;
  MvrisModelCode: string;
  Vin: string;
  Vrm: string;
  DateFirstRegistered: Date;
  DateScrapped?: string;
  DoorPlan: string;
  YearMonthFirstRegistered: string;
  VinLast5: string;
  VehicleUsedBeforeFirstRegistration: boolean;
  MaxPermissibleMass: number;
  Make: string;
  MakeModel: string;
  TransmissionType: string;
  SeatingCapacity: number;
  FuelType: string;
  Co2Emissions: number;
  Imported: boolean;
  MvrisMakeCode: string;
  PreviousVrmNi?: string;
  VinConfirmationFlag?: any;
}

export class SmmtDetails {
  Range: string;
  FuelType: string;
  EngineCapacity: string;
  MarketSectorCode: string;
  CountryOfOrigin: string;
  ModelCode: string;
  ModelVariant: string;
  DataVersionNumber?: any;
  NumberOfGears: number;
  NominalEngineCapacity: number;
  MarqueCode: string;
  Transmission: string;
  BodyStyle: string;
  VisibilityDate: string;
  SysSetupDate: string;
  Marque: string;
  CabType: string;
  TerminateDate?: any;
  Series: string;
  NumberOfDoors: number;
  DriveType: string;
}

export class DataItems {
  TechnicalDetails: TechnicalDetails;
  ClassificationDetails: ClassificationDetails;
  VehicleStatus: VehicleStatus;
  VehicleHistory: VehicleHistory;
  VehicleRegistration: VehicleRegistration;
  SmmtDetails: SmmtDetails;
}

export class Response {
  StatusCode: string;
  StatusMessage: string;
  StatusInformation: StatusInformation;
  DataItems: DataItems;
}

export class PlateAPIResponse {
  BillingAccount: BillingAccount;
  TechnicalSupport: TechnicalSupport;
  Request: Request;
  Response: Response;
}
