import { FLAG_CODE, SERVICE_STATUS } from './constants';
import { FlagCode } from './enums';

export type ExecutionType = {
  exploit_id: number;
  finished_at: string;
  id: number;
  output: string;
  started_at: string;
  target_id: number;
  exit_code: number;

  service: string;
  target_tick: number;
  team: string;
};

// export type FlagCodeType = `${FlagCode}`;
export type FlagType = {
  execution_id: number;
  exploit_id: number;
  id: number;
  status: FlagCode;
  submitted: boolean;
  text: string;
  timestamp: string;

  service: string;
  target_tick: number;
  team: string;
};

export type ScoreboardType = {
  teams: {
    [key: string]: {
      ip: string;
      name: string;
      services: {
        [key: string]: number;
      };
    };
  };
};

export type LoggingDisplayProps = {
  data: FlagType[] | ExecutionType[];
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

export type ExploitType = {
  id: number;
  name: string;
  enabled: boolean;
  service: string;
  pool_size: number;
  docker_image: string;
  docker_containers: string[];
  blacklist: string[];
};
