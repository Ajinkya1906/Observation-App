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
  Name?: string;
  Datas?: Data[];

  id: string;
  SamplingTime: string;
  Properties: Property[];
}
