import { FLAG_CODE, SERVICE_STATUS } from './constants';

export type FlagCodeType = keyof typeof FLAG_CODE;
export type ServiceStatusType = keyof typeof SERVICE_STATUS;

export type ExecutionType = {
  id: number;
  exploit_id: number;
  output: string;
  exit_code: number;
  started_at: string;
  finished_at: string;
  target_id: number;

  service: string;
  target_tick: number;
  team: string;
};

// export type FlagCodeType = `${FlagCode}`;
export type FlagType = {
  id: number;
  text: string;
  status: FlagCodeType;
  submitted: boolean;
  timestamp: string;
  execution_id: number;
  exploit_id: number;

  service: string;
  target_tick: number;
  team: string;
};

export type ScoreboardType = {
  teams: {
    [key: string]: {
      ip: string;
      name?: string;
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
