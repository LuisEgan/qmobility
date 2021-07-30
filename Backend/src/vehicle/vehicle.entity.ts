import { BaseType } from '../customization/graphql/base.type';
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { ChargeStandardTable } from './types/charge-standard-table.type';

const ChargeStandardTableReturn = () => ChargeStandardTable;
const StringArrayReturn = () => [String];

@Entity()
@ObjectType('Vehicle', { implements: [BaseType] })
export class Vehicle extends BaseType {
  @Column()
  @Field()
  Vehicle_ID: number;

  @Column()
  @Field()
  Vehicle_Make: string;

  @Column()
  @Field()
  Vehicle_Model: string;

  @Column()
  @Field({ nullable: true })
  Vehicle_Model_Version?: string;

  @Column()
  @Field({ nullable: true })
  Availability_Status?: number;

  @Column()
  @Field({ nullable: true })
  Availability_Date_From?: string;

  @Column()
  @Field({ nullable: true })
  Availability_Date_To?: string;

  @Column()
  @Field()
  Price_From_DE: number;

  @Column()
  @Field()
  Price_From_DE_Estimate: boolean;

  @Column()
  @Field()
  Price_From_NL: number;

  @Column()
  @Field()
  Price_From_NL_Estimate: boolean;

  @Column()
  @Field()
  Price_From_UK: number;

  @Column()
  Price_Grant_PICG_UK: number;

  @Column()
  @Field()
  Price_From_UK_Estimate: boolean;

  @Column()
  @Field()
  Drivetrain_Type: string;

  @Column()
  @Field()
  Drivetrain_Fuel: string;

  @Column()
  @Field()
  Drivetrain_Propulsion: string;

  @Column()
  @Field()
  Drivetrain_Power: number;

  @Column()
  @Field()
  Drivetrain_Power_HP: number;

  @Column()
  @Field()
  Drivetrain_Torque: number;

  @Column()
  @Field()
  Performance_Acceleration: number;

  @Column()
  @Field()
  Performance_Topspeed: number;

  @Column()
  @Field({ nullable: true })
  Range_WLTP?: string;

  @Column()
  @Field()
  Range_WLTP_Estimate: boolean;

  @Column()
  @Field({ nullable: true })
  Range_NEDC?: string;

  @Column()
  @Field()
  Range_NEDC_Estimate: boolean;

  @Column()
  @Field()
  Range_Real: number;

  @Column()
  @Field()
  Range_Real_Mode: string;

  @Column()
  @Field()
  Range_Real_WHwy: number;

  @Column()
  @Field()
  Range_Real_WCmb: number;

  @Column()
  @Field()
  Range_Real_WCty: number;

  @Column()
  @Field()
  Range_Real_BHwy: number;

  @Column()
  @Field()
  Range_Real_BCmb: number;

  @Column()
  @Field()
  Range_Real_BCty: number;

  @Column()
  @Field({ nullable: true })
  Efficiency_WLTP?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_WLTP_FuelEq?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_WLTP_V?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_WLTP_FuelEq_V?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_WLTP_CO2?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_NEDC?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_NEDC_FuelEq?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_NEDC_V?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_NEDC_FuelEq_V?: string;

  @Column()
  @Field({ nullable: true })
  Efficiency_NEDC_CO2?: string;

  @Column()
  @Field()
  Efficiency_Real: number;

  @Column()
  @Field()
  Efficiency_Real_FuelEq_V: number;

  @Column()
  @Field()
  Efficiency_Real_CO2: number;

  @Column()
  @Field()
  Efficiency_Real_WHwy: number;

  @Column()
  @Field()
  Efficiency_Real_WCmb: number;

  @Column()
  @Field()
  Efficiency_Real_WCty: number;

  @Column()
  @Field()
  Efficiency_Real_BHwy: number;

  @Column()
  @Field()
  Efficiency_Real_BCmb: number;

  @Column()
  @Field()
  Efficiency_Real_BCty: number;

  @Column()
  @Field()
  Charge_Plug: string;

  @Column()
  @Field()
  Charge_Plug_Estimate: boolean;

  @Column()
  @Field()
  Charge_Plug_Location: string;

  @Column()
  @Field()
  Charge_Standard_Power: number;

  @Column()
  @Field()
  Charge_Standard_Phase: number;

  @Column()
  @Field()
  Charge_Standard_PhaseAmp: number;

  @Column()
  @Field()
  Charge_Standard_ChargeTime: number;

  @Column()
  @Field()
  Charge_Standard_ChargeSpeed: number;

  @Column()
  @Field()
  Charge_Standard_Estimate: boolean;

  @Column()
  @Field(ChargeStandardTableReturn, { nullable: true })
  Charge_Standard_Table: ChargeStandardTable;

  @Column()
  @Field({ nullable: true })
  Charge_Alternative_Power?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Alternative_Phase?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Alternative_PhaseAmp?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Alternative_ChargeTime?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Alternative_ChargeSpeed?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Alternative_Table?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Option_Power?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Option_Phase?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Option_PhaseAmp?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Option_ChargeTime?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Option_ChargeSpeed?: string;

  @Column()
  @Field({ nullable: true })
  Charge_Option_Table?: string;

  @Column()
  @Field({ nullable: true })
  Fastcharge_Plug: string;

  @Column()
  @Field({ nullable: true })
  Fastcharge_Plug_Estimate: boolean;

  @Column()
  @Field({ nullable: true })
  Fastcharge_Plug_Location: string;

  @Column()
  @Field({ nullable: true })
  Fastcharge_Power_Max: number;

  @Column()
  @Field({ nullable: true })
  Fastcharge_Power_Avg: number;

  @Column()
  @Field({ nullable: true })
  Fastcharge_ChargeTime?: number;

  @Column()
  @Field({ nullable: true })
  Fastcharge_ChargeSpeed: number;

  @Column()
  @Field({ nullable: true })
  Fastcharge_Optional: boolean;

  @Column()
  @Field()
  Fastcharge_Estimate: boolean;

  @Column()
  @Field()
  Battery_Capacity_Useable: number;

  @Column()
  @Field()
  Battery_Capacity_Full: number;

  @Column()
  @Field()
  Battery_Capacity_Estimate: string;

  @Column()
  @Field()
  Dims_Length: number;

  @Column()
  @Field()
  Dims_Width: number;

  @Column()
  @Field()
  Dims_Height: number;

  @Column()
  @Field()
  Dims_Wheelbase: number;

  @Column()
  @Field()
  Dims_Weight: number;

  @Column()
  @Field()
  Dims_Bootspace: number;

  @Column()
  @Field()
  Dims_Bootspace_Max: number;

  @Column()
  @Field({ nullable: true })
  Dims_TowWeight_Unbraked?: string;

  @Column()
  @Field({ nullable: true })
  Dims_TowWeight_Braked?: string;

  @Column()
  @Field({ nullable: true })
  Dims_RoofLoad_Max?: string;

  @Column()
  @Field()
  Misc_Body: string;

  @Column()
  @Field()
  Misc_Segment: string;

  @Column()
  @Field()
  Misc_Seats: number;

  @Column()
  @Field()
  Misc_Roofrails: boolean;

  @Column()
  @Field({ nullable: true })
  Misc_Isofix?: string;

  @Column()
  @Field({ nullable: true })
  Misc_Isofix_Seats?: string;

  @Column()
  @Field({ nullable: true })
  Misc_TurningCircle?: string;

  @Column()
  @Field()
  EuroNCAP_Rating: number;

  @Column()
  @Field()
  EuroNCAP_Year: number;

  @Column()
  @Field()
  EuroNCAP_Adult: number;

  @Column()
  @Field()
  EuroNCAP_Child: number;

  @Column()
  @Field()
  EuroNCAP_VRU: number;

  @Column()
  @Field()
  EuroNCAP_SA: number;

  @Column()
  @Field({ nullable: true })
  Related_Vehicle_ID_Succesor?: string;

  @Column()
  @Field()
  EVDB_Detail_URL: string;

  @Column()
  @Field(StringArrayReturn, { nullable: true, defaultValue: [] })
  Images?: string[];

  @Column()
  @Field(StringArrayReturn, { nullable: true, defaultValue: [] })
  Videos?: string[];
}
