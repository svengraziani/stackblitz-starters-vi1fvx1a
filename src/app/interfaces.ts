export interface VehicleData {
  umlauftage: number;
  produktivkilometer: number;
  leerkilometer: number;
}

export interface PropertyOption {
  label: string;
  value: keyof VehicleData;
}

export interface ScenarioData {
  baseColor: string;
  vehicles: {
    [key: string]: VehicleData;
  };
}

export interface Scenarios {
  [key: string]: ScenarioData;
}

export interface VehicleInfo {
  key: string;
  value: VehicleData;
  index: number;
  stackPosition: number;
  normalizedHeight: number;
}

export interface ScenarioInfo {
  key: string;
  baseColor: string;
}