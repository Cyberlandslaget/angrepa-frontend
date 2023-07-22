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

/*
CREATE TABLE exploits (
    -- unique id
    id TEXT PRIMARY KEY,
    running BOOLEAN NOT NULL DEFAULT FALSE,
    -- the service to attack
    attack_target TEXT,
    -- the blacklisted ips (non-null array of non-null strings)
    blacklist TEXT[] NOT NULL,
    -- the image id
    docker_image TEXT NOT NULL,
    -- the type (for recreating the actual instance)
    exploit_kind TEXT NOT NULL
);
*/
export type ExploitType = {
  id: string;
  running: boolean;
  attack_target: string; // Service
  blacklist: string[];
  docker_image: string;
  exploit_kind: string;
};
