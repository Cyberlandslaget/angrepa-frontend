// Resizable constants
export const DEFAULT_RESIZABLE_ENABLE = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};
export const DEFAULT_RESIZABLE_CONFIG = {
  maxWidth: '100%',
  maxHeight: '100%',
  minHeight: 110,
  defaultSize: { width: '100%', height: 500 },
  enable: { ...DEFAULT_RESIZABLE_ENABLE, bottom: true },
};

// Navigation constants
export const PAGES = [
  { title: 'Home', href: '/' },
  { title: 'Logs', href: '/' },
  { title: 'Exploits', href: '/exploits' },
  { title: 'Scoreboard', href: '/scoreboard' },
];

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

// Stack
export const DUMMY_FLAGSUBMISSION_LOG = [
  {
    team: 3,
    tick: 5,
    code: 'INV',
    output: '<h1>flag{Advanced Exploit - Service 1}</h1>',
    timestamp: new Date(6),
    service: 'dummy-web1',
  },
  {
    team: 1,
    tick: 4,
    code: 'OLD',
    output: 'flag{Advanced Exploit - Service 1}',
    timestamp: new Date(5),
    service: 'dummy-web1',
  },
  {
    team: 1,
    tick: 3,
    code: 'ERR',
    output: 'ERROR: 500 - asdadasda',
    timestamp: new Date(5),
    service: 'dummy-web1',
  },
  {
    team: 3,
    tick: 2,
    code: 'ERR',
    output: 'ERROR: 500 - asdasd',
    timestamp: new Date(2),
    service: 'dummy-web1',
  },
  {
    team: 3,
    tick: 2,
    code: 'OK',
    output: 'flag{Advanced Exploit - Service 2}',
    timestamp: new Date(3),
    service: 'dummy-web1',
  },
  {
    team: 3,
    tick: 2,
    code: 'DUP',
    output: 'flag{Advanced Exploit - Service 1}',
    timestamp: new Date(4),
    service: 'dummy-web1',
  },
  {
    team: 1,
    tick: 1,
    code: 'OK',
    output: 'flag{Advanced Exploit - Service 1}',
    timestamp: new Date(0),
    service: 'dummy-web1',
  },
  {
    team: 2,
    tick: 1,
    code: 'DUP',
    output: 'flag{Advanced Exploit - Service 1}',
    timestamp: new Date(1),
    service: 'dummy-web1',
  },
];

// Stack
export const DUMMY_EXPLOIT_LOG = [
  {
    timestamp: new Date(13),
    status: 'error',
    raw: '2.056 ./scripts/s1.py timed out!',
  },
  {
    timestamp: new Date(12),
    status: 'success',
    raw: '0.054 Finished ./scripts/s2.py',
  },
  {
    timestamp: new Date(11),
    status: 'error',
    raw: `0.054 ./scripts/s2.py: Traceback (most recent call last):\nFile "/home/kat/Documents/benchmarking/./scripts/s2.py", line 1, in <module>\n		f = open("lpol", "r")\nFileNotFoundError: [Errno 2] No such file or directory: 'lpol'`,
  },
  {
    timestamp: new Date(10),
    status: 'success',
    raw: '0.016 Finished ./scripts/inner/is2.py',
  },
  {
    timestamp: new Date(9),
    status: 'info',
    raw: '0.016 ./scripts/inner/is2.py: is2',
  },
  {
    timestamp: new Date(8),
    status: 'success',
    raw: '0.012 Finished ./scripts/s3.py',
  },
  {
    timestamp: new Date(7),
    status: 'success',
    raw: '0.012 Finished ./scripts/inner/is1.py',
  },
  {
    timestamp: new Date(6),
    status: 'info',
    raw: '0.012 ./scripts/inner/is1.py: is1',
  },
  {
    timestamp: new Date(5),
    status: 'info',
    raw: '0.012 ./scripts/s3.py: s3',
  },
  {
    timestamp: new Date(4),
    status: 'info',
    raw: '0.000 Running ./scripts/s3.py',
  },
  {
    timestamp: new Date(3),
    status: 'info',
    raw: '0.000 Running ./scripts/inner/is1.py',
  },
  {
    timestamp: new Date(2),
    status: 'info',
    raw: '0.000 Running ./scripts/s2.py',
  },
  {
    timestamp: new Date(1),
    status: 'info',
    raw: '0.000 Running ./scripts/s1.py',
  },
  {
    timestamp: new Date(0),
    status: 'info',
    raw: '0.000 Running ./scripts/inner/is2.py',
  },
];
