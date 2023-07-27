export const CONFIG = {
  MGMT_SERVER_URL: import.meta.env.DEV
    ? 'http://angrepa.cybl:8000'
    : 'http://172.23.136.53:5000', //`http://${window.location.hostname}:5000`,
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

// Dummy data constants
export const DUMMY_SCOREBOARD_DATA = {
  currentTick: 6,
  teams: {
    1: {
      name: 'organizers',
      services: {
        'dummy-web1': SERVICE_STATUS.UP,
        'dummy-web2': SERVICE_STATUS.UP,
        'dummy-binary1': SERVICE_STATUS.UP,
        'dummy-binary2': SERVICE_STATUS.UP,
        'pirate-birthday': SERVICE_STATUS.UP,
        test1: SERVICE_STATUS.UP,
        test2: SERVICE_STATUS.UP,
        test3: SERVICE_STATUS.UP,
      },
    },
    2: {
      name: 'fibonhack',
      services: {
        'dummy-web1': SERVICE_STATUS.UP,
        'dummy-web2': SERVICE_STATUS.UP,
        'dummy-binary1': SERVICE_STATUS.UP,
        'dummy-binary2': SERVICE_STATUS.UP,
        'pirate-birthday': SERVICE_STATUS.UP,
        test1: SERVICE_STATUS.UP,
        test2: SERVICE_STATUS.UP,
        test3: SERVICE_STATUS.UP,
      },
    },
    3: {
      name: 'WaterPaddler',
      services: {
        'dummy-web1': SERVICE_STATUS.UP,
        'dummy-web2': SERVICE_STATUS.UP,
        'dummy-binary1': SERVICE_STATUS.UP,
        'dummy-binary2': SERVICE_STATUS.UP,
        'pirate-birthday': SERVICE_STATUS.UP,
        test1: SERVICE_STATUS.UP,
        test2: SERVICE_STATUS.UP,
        test3: SERVICE_STATUS.UP,
      },
    },
    4: {
      name: 'printer toner level: 90%',
      services: {
        'dummy-web1': SERVICE_STATUS.UP,
        'dummy-web2': SERVICE_STATUS.UP,
        'dummy-binary1': SERVICE_STATUS.UP,
        'dummy-binary2': SERVICE_STATUS.UP,
        'pirate-birthday': SERVICE_STATUS.UP,
        test1: SERVICE_STATUS.UP,
        test2: SERVICE_STATUS.UP,
        test3: SERVICE_STATUS.UP,
      },
    },
    5: {
      name: 'bootplug',
      services: {
        'dummy-web1': SERVICE_STATUS.UP,
        'dummy-web2': SERVICE_STATUS.FAULTY,
        'dummy-binary1': SERVICE_STATUS.UP,
        'dummy-binary2': SERVICE_STATUS.RECOVERING,
        'pirate-birthday': SERVICE_STATUS.FLAG_NOT_FOUND,
        test1: SERVICE_STATUS.UP,
        test2: SERVICE_STATUS.UP,
        test3: SERVICE_STATUS.UP,
      },
    },
  },
};
export const DUMMY_TEAMS_DATA = {
  teams: {
    '10.0.1.1': {
      ip: '10.0.1.1',
      name: 'NOP',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.3.1': {
      ip: '10.0.2.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.2.1': {
      ip: '10.0.3.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.4.1': {
      ip: '10.0.4.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.5.1': {
      ip: '10.0.5.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.6.1': {
      ip: '10.0.6.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.7.1': {
      ip: '10.0.7.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.8.1': {
      ip: '10.0.8.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.9.1': {
      ip: '10.0.9.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
    '10.0.10.1': {
      ip: '10.0.10.1',
      name: '',
      services: {
        testservice: SERVICE_STATUS.UP,
      },
    },
  },
};

export const DUMMY_FLAGSUBMISSION_LOG = [
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 5,
    timestamp: new Date(5),
    execution_id: 1,
    exploit_id: 1,
    team: 2,
    service: 'testservice',
    submitted: true,
    status: 'OK',
  },
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 4,
    timestamp: new Date(5),
    execution_id: 1,
    exploit_id: 1,
    team: 1,
    service: 'testservice',
    submitted: true,
    status: 'OLD',
  },
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 3,
    timestamp: new Date(5),
    execution_id: 1,
    exploit_id: 1,
    team: 1,
    service: 'testservice',
    submitted: true,
    status: 'ERR',
  },
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 2,
    timestamp: new Date(2),
    execution_id: 1,
    exploit_id: 1,
    team: 3,
    service: 'testservice',
    submitted: true,
    status: 'ERR',
  },
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 2,
    timestamp: new Date(3),
    execution_id: 1,
    exploit_id: 1,
    team: 3,
    service: 'testservice',
    submitted: true,
    status: 'OK',
  },
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 2,
    timestamp: new Date(4),
    execution_id: 1,
    exploit_id: 1,
    team: 3,
    service: 'testservice',
    submitted: true,
    status: 'DUP',
  },
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 1,
    timestamp: new Date(0),
    execution_id: 1,
    exploit_id: 1,
    team: 1,
    service: 'testservice',
    submitted: true,
    status: 'OK',
  },
  {
    text: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    target_tick: 1,
    timestamp: new Date(0),
    execution_id: 1,
    exploit_id: 1,
    team: 2,
    service: 'testservice',
    submitted: true,
    status: 'DUP',
  },
];

export const DUMMY_EXPLOIT_LOG = [
  {
    started_at: new Date(13),
    finished_at: new Date(13),
    status: 0,
    output: '2.056 ./scripts/s1.py timed out!',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(12),
    finished_at: new Date(12),
    status: 0,
    output: '0.054 Finished ./scripts/s2.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(11),
    finished_at: new Date(11),
    status: 0,
    output: `0.054 ./scripts/s2.py: Traceback (most recent call last):\nFile "/home/kat/Documents/benchmarking/./scripts/s2.py", line 1, in <module>\n		f = open("lpol", "r")\nFileNotFoundError: [Errno 2] No such file or directory: 'lpol'`,
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(10),
    finished_at: new Date(10),
    status: 0,
    output: '0.016 Finished ./scripts/inner/is2.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(9),
    finished_at: new Date(9),
    status: 0,
    output: '0.016 ./scripts/inner/is2.py: is2',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(8),
    finished_at: new Date(8),
    status: 0,
    output: '0.012 Finished ./scripts/s3.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(7),
    finished_at: new Date(7),
    status: 0,
    output: '0.012 Finished ./scripts/inner/is1.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(6),
    finished_at: new Date(6),
    status: 0,
    output: '0.012 ./scripts/inner/is1.py: is1',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(5),
    finished_at: new Date(5),
    status: 0,
    output: '0.012 ./scripts/s3.py: s3',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(4),
    finished_at: new Date(4),
    status: 0,
    output: '0.000 Running ./scripts/s3.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(3),
    finished_at: new Date(3),
    status: 0,
    output: '0.000 Running ./scripts/inner/is1.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(2),
    finished_at: new Date(2),
    status: 0,
    output: '0.000 Running ./scripts/s2.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(1),
    finished_at: new Date(1),
    status: 0,
    output: '0.000 Running ./scripts/s1.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
  {
    started_at: new Date(0),
    finished_at: new Date(0),
    status: 0,
    output: '0.000 Running ./scripts/inner/is2.py',
    target_tick: 1,
    id: 1,
    service: 'testservice',
  },
];
