export interface Property {
    Value: string | number | boolean;
    Label: string;
}

export interface Data {
    SamplingTime: string;
    Properties: Property[];
}

export interface Observation {
    Id: number;
    Name: string;
    Datas: Data[];
} 