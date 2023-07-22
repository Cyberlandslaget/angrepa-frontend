export const CONFIG = {
  MGMT_SERVER_URL: 'http://web-server:5000',
};
// Navigation constants
export const PAGES = [
  { title: 'Home', href: '/' },
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
export const FLAG_STATUS = {
  Accepted: 'OK', // Accepted: X flag points
  Duplicate: 'DUP', // Denied: flag already claimed
  Old: 'OLD', // Denied: flag too old
  Invalid: 'INV', // Denied: invalid flag
  Own: 'OWN', // Denied: flag is your own
  Error: 'ERR', // Error: <<ERROR>>
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

/*
CREATE TABLE flags (
    -- flag itself
    flag TEXT NOT NULL PRIMARY KEY,

    -- the tick the flag was submitted
    tick INTEGER,
    -- time of submission
    stamp TIMESTAMP,

    -- the exploit that submitted this flag
    exploit_id TEXT,
    -- target ip
    target_ip TEXT,
    -- service that was exploited
    flagstore TEXT,

    -- sent to gameserver?
    sent BOOLEAN NOT NULL DEFAULT FALSE,
    -- status. None = no response yet. Some(x) = status is x
    status TEXT
);
*/
export const DUMMY_FLAGSUBMISSION_LOG = [
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 5,
    stamp: new Date(5),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.2.130',
    team: 2,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'OK',
  },
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 4,
    stamp: new Date(5),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.1.130',
    team: 1,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'OLD',
  },
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 3,
    stamp: new Date(5),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.1.130',
    team: 1,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'ERR',
  },
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 2,
    stamp: new Date(2),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.3.130',
    team: 3,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'ERR',
  },
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 2,
    stamp: new Date(3),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.3.130',
    team: 3,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'OK',
  },
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 2,
    stamp: new Date(4),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.3.130',
    team: 3,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'DUP',
  },
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 1,
    stamp: new Date(0),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.1.130',
    team: 1,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'OK',
  },
  {
    flag: 'ECSC_KcpNAJ2gTzNviLzZE6hsIKIEJqbV4Dcr',
    tick: 1,
    stamp: new Date(0),
    exploit_id: 'da5f0e21e628e1d3',
    target_ip: '10.1.2.130',
    team: 2,
    flagstore: 'dummy-web1',
    sent: true,
    status: 'DUP',
  },
];
/*
CREATE TABLE exploits (
    -- unique id
    id TEXT PRIMARY KEY,
    running BOOLEAN NOT NULL DEFAULT FALSE,
    attack_target TEXT,
    -- the image id
    docker_image TEXT NOT NULL,
    -- the type (for recreating the actual instance)
    exploit_kind TEXT NOT NULL
);
*/
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
