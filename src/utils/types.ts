import { FLAG_CODE, SERVICE_STATUS } from './constants';

export type DataType = {
  team?: number;
  tick?: number;
  code?: string;
  output?: string;
  timestamp?: Date;
  service?: string;

  status?: string;
  raw?: string;
};

export type LoggingDisplayProps = {
  data: DataType[];
  parser: 'exploit' | 'submission';
  extended: boolean;
  filters: string[];
};

export type FlagCodeType = keyof typeof FLAG_CODE;
export type ServiceStatusType = keyof typeof SERVICE_STATUS;
