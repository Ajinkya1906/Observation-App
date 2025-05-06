export interface Property {
  Label: string;
  Value: any;
}

export interface ObservationData {
  SamplingTime: string;
  ProjectName: string;
  Properties: Property[];
} 