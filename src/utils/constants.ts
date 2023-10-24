import { File } from './types';

export const CONFIG = {
  MGMT_SERVER_URL: 'http://nordbo.cybl:8000',
  // MGMT_SERVER_URL: `http://${window.location.hostname}:8000`,
};

// Display constants
export const FLAG_CODE = {
  OK: 7, // Accepted: X flag points
  DUP: 6, // Denied: flag already claimed
  OLD: 5, // Denied: flag too old
  INV: 4, // Denied: invalid flag
  NOP: 3, // Denied: flag from nop team
  OWN: 2, // Denied: flag is your own
  ERR: 1, // Error: <<ERROR>>
};
export const SERVICE_STATUS = {
  UP: 0,
  DOWN: 1,
  FAULTY: 2,
  FLAG_NOT_FOUND: 3,
  RECOVERING: 4,
  UNKNOWN: -1,
};

export const DEFAULT_CONFIG_JSON = (): File => ({
  name: 'config.json',
  data: new TextEncoder().encode(`{
  "name": "test",
  "service": "testservice",
  "blacklist": [],
  "pool": 1
}`),
});

// Dummy data constants
export const DUMMY_SCOREBOARD_DATA = {
  teams: {
    '10.0.1.1': {
      ip: '10.0.1.1',
      name: 'NOP',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.2.1': {
      ip: '10.0.2.1',
      name: 'Cyberlandslaget',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.3.1': {
      ip: '10.0.3.1',
      name: 'Iku-toppene',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.4.1': {
      ip: '10.0.4.1',
      name: 'Bootplug',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.5.1': {
      ip: '10.0.5.1',
      name: 'Corax',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.6.1': {
      ip: '10.0.6.1',
      name: 'RumbleInTheJungle',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.7.1': {
      ip: '10.0.7.1',
      name: 'coldboots',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.8.1': {
      ip: '10.0.8.1',
      name: 'Norske Nøkkelsnikere',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.9.1': {
      ip: '10.0.9.1',
      name: 'EPT',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.10.1': {
      ip: '10.0.10.1',
      name: 'mode13h',
      services: {
        testservice: SERVICE_STATUS.UP,
        new_testservice: SERVICE_STATUS.UP,
      },
    },
  },
};

export const DUMMY_FLAGSUBMISSION_LOG = [
  {
    id: 1,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'OK',
    submitted: true,
    timestamp: new Date(5).toUTCString(),
    execution_id: 1,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 5,
    team: '10.0.2.1',
  },
  {
    id: 2,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'OLD',
    submitted: true,
    timestamp: new Date(5).toUTCString(),
    execution_id: 2,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 4,
    team: '10.0.1.1',
  },
  {
    id: 3,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'ERR',
    submitted: true,
    timestamp: new Date(5).toUTCString(),
    execution_id: 3,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 3,
    team: '10.0.1.1',
  },
  {
    id: 4,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'ERR',
    submitted: true,
    timestamp: new Date(2).toUTCString(),
    execution_id: 4,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 2,
    team: '10.0.3.1',
  },
  {
    id: 5,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'OK',
    submitted: true,
    timestamp: new Date(3).toUTCString(),
    execution_id: 5,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 2,
    team: '10.0.3.1',
  },
  {
    id: 6,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'DUP',
    submitted: true,
    timestamp: new Date(4).toUTCString(),
    execution_id: 6,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 2,
    team: '10.0.3.1',
  },
  {
    id: 7,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'OK',
    submitted: true,
    timestamp: new Date(0).toUTCString(),
    execution_id: 7,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 8,
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    status: 'DUP',
    submitted: true,
    timestamp: new Date(0).toUTCString(),
    execution_id: 8,
    exploit_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.2.1',
  },
];

export const DUMMY_EXPLOIT_LOG = [
  {
    id: 1,
    exploit_id: 1,
    output: '2.056 ./scripts/s1.py timed out!',
    exit_code: 1,
    started_at: new Date(13).toUTCString(),
    finished_at: new Date(13).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 2,
    exploit_id: 1,
    output: '0.054 Finished ./scripts/s2.py',
    exit_code: 0,
    started_at: new Date(12).toUTCString(),
    finished_at: new Date(12).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 3,
    exploit_id: 1,
    output: `0.054 ./scripts/s2.py: Traceback (most recent call last):\nFile "/home/kat/Documents/benchmarking/./scripts/s2.py", line 1, in <module>\n		f = open("lpol", "r")\nFileNotFoundError: [Errno 2] No such file or directory: 'lpol'`,
    exit_code: 0,
    started_at: new Date(11).toUTCString(),
    finished_at: new Date(11).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 4,
    exploit_id: 1,
    output: '0.016 Finished ./scripts/inner/is2.py',
    exit_code: 0,
    started_at: new Date(10).toUTCString(),
    finished_at: new Date(10).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 5,
    exploit_id: 1,
    output: '0.016 ./scripts/inner/is2.py: is2',
    exit_code: 0,
    started_at: new Date(9).toUTCString(),
    finished_at: new Date(9).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 6,
    exploit_id: 1,
    output: '0.012 Finished ./scripts/s3.py',
    exit_code: 0,
    started_at: new Date(8).toUTCString(),
    finished_at: new Date(8).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 7,
    exploit_id: 1,
    output: '0.012 Finished ./scripts/inner/is1.py',
    exit_code: 0,
    started_at: new Date(7).toUTCString(),
    finished_at: new Date(7).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 8,
    exploit_id: 1,
    output: '0.012 ./scripts/inner/is1.py: is1',
    exit_code: 0,
    started_at: new Date(6).toUTCString(),
    finished_at: new Date(6).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 9,
    exploit_id: 1,
    output: '0.012 ./scripts/s3.py: s3',
    exit_code: 0,
    started_at: new Date(5).toUTCString(),
    finished_at: new Date(5).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 10,
    exploit_id: 1,
    output: '0.000 Running ./scripts/s3.py',
    exit_code: 0,
    started_at: new Date(4).toUTCString(),
    finished_at: new Date(4).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 11,
    exploit_id: 1,
    output: '0.000 Running ./scripts/inner/is1.py',
    exit_code: 0,
    started_at: new Date(3).toUTCString(),
    finished_at: new Date(3).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 12,
    exploit_id: 1,
    output: '0.000 Running ./scripts/s2.py',
    exit_code: 0,
    started_at: new Date(2).toUTCString(),
    finished_at: new Date(2).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 13,
    exploit_id: 1,
    output: '0.000 Running ./scripts/s1.py',
    exit_code: 0,
    started_at: new Date(1).toUTCString(),
    finished_at: new Date(1).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
  {
    id: 14,
    exploit_id: 1,
    output: '0.000 Running ./scripts/inner/is2.py',
    exit_code: 0,
    started_at: new Date(0).toUTCString(),
    finished_at: new Date(0).toUTCString(),
    target_id: 1,

    service: 'testservice',
    target_tick: 1,
    team: '10.0.1.1',
  },
];
