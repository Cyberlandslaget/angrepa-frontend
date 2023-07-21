import { FLAG_CODE, SERVICE_STATUS } from './constants';

export type DataType = {
  // Exploit
  id?: string;
  running?: boolean;
  attack_target?: string | null;
  docker_image?: string;
  exploit_kind?: string;
  timestamp?: Date;
  raw?: string;

  // Submission
  flag?: string;
  tick?: number;
  stamp?: Date;
  exploit_id?: string;
  target_ip?: string;
  team?: number;
  flagstore?: string;
  sent?: boolean;

  status?: string;
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
