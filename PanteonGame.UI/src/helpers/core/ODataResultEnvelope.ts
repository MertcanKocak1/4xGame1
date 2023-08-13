export interface IEnvelope<T> {
    value: T[];
    '@odata.count': number;
    count?: number;
  }