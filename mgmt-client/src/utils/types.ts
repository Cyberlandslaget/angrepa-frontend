import { FLAG_CODE, SERVICE_STATUS } from './constants';
import { FlagCode } from './enums';

export type ExecutionType = {
  exploit_id: number;
  finished_at: Date;
  id: number;
  output: string;
  started_at: Date;
  target_id: number;
  exit_code: number;

  service: string;
  target_tick: number;
};

// export type FlagCodeType = `${FlagCode}`;
export type FlagType = {
  execution_id: number;
  exploit_id: number;
  id: number;
  status: FlagCode;
  submitted: boolean;
  text: string;
  timestamp: Date;

  service: string;
  target_tick: number;
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
  id: string;
  running: boolean;
  attack_target: string; // Service
  blacklist: string[];
  docker_image: string;
  exploit_kind: string;
};
