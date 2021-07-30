interface Address {
  SubBuildingName?: string;
  BuildingName: string;
  BuildingNumber: string;
  Thoroughfare: string;
  Street: string;
  DoubleDependantLocality?: string;
  DependantLocality?: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country: string;
  UPRN?: string;
}

export default Address;
