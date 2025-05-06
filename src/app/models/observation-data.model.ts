export interface Property {
  Label: string;
  Value: string | number | boolean;
}

export interface Data {
  SamplingTime: string;
  Properties: Property[];
  id: number;
}

export interface ObservationData {
  // SamplingTime: any;
  // Properties: any;
  // Id: number;
  Name?: string;
  Datas?: Data[];

  id: string;
  // id: number;
  SamplingTime: string;
  Properties: Property[];
}
