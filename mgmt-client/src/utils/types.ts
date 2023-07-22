import { FLAG_CODE, SERVICE_STATUS } from './constants';

export type DataType = {
  // Exploit
  id?: string;
  from_exploit_id?: string;
  from_ip?: string | null;
  content?: string;

  // Submission
  flag?: string;
  exploit_id?: string;
  target_ip?: string;
  team?: number;
  flagstore?: string;
  sent?: boolean;
  status?: string;

  tick?: number;
  stamp?: Date;
};
export type ScoreboardType = {
  currentTick: number;
  teams: {
    [key: string]: {
      name: string;
      services: {
        [key: string]: number;
      };
    };
  };
};

export type LoggingDisplayProps = {
  data: DataType[];
  parser: 'exploit' | 'submission';
  extended: boolean;
  filters: string[];
};

export type FlagCodeType = keyof typeof FLAG_CODE;
export type ServiceStatusType = keyof typeof SERVICE_STATUS;

export type File = {
  name: string;
  data: ArrayBuffer;
};

export type Exploit = {
  id: number;
  teams: number[];
  service: string;
  files: File[];
};
