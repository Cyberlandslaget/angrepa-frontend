import { FLAG_CODE } from './constants';
import { DataType, FlagCodeType } from './types';

export const getTick = () => {
  Math.floor(
    (new Date().getTime() - new Date('2023-07-22T12:00:00Z').getTime()) /
      (1000 * 60)
  );
};

type Ticks = {
  [key: number]: DataType | null;
};
type ServiceTicks = {
  [key: string]: Ticks;
};
type Challenges = {
  [key: string]: ServiceTicks;
};

export const removeDuplicates = (
  teams: string[],
  services: string[],
  challs: DataType[],
  currentTick: number
) => {
  const nchalls: Challenges = {};

  // Generate ticks by team services
  for (const teamId of teams) {
    const serviceTicks: ServiceTicks = {};
    for (const service of services) {
      const ticks: Ticks = {};
      for (let tick = currentTick; tick > 0; tick--) {
        ticks[tick] = null;
      }
      serviceTicks[service] = ticks;
    }
    nchalls[teamId] = serviceTicks;
  }
  // Get total amount of services from current tick
  for (let i = 0, length = challs.length; i < length; i++) {
    const chall = challs[i];
    try {
      let nexists, nnexists;
      const exists =
        nchalls[
          Number(chall?.target_ip?.split('.')[2]) ||
            Math.floor(chall?.team || 0) ||
            ''
        ];
      if (exists) {
        nexists = exists[chall?.flagstore || ''];
        if (nexists) nnexists = nexists[chall?.tick || 0];
      }

      if (nnexists) {
        if (
          FLAG_CODE[chall.status as FlagCodeType] >
          FLAG_CODE[nnexists.status as FlagCodeType]
        ) {
          nchalls[
            Number(chall?.target_ip?.split('.')[2]) ||
              Math.floor(chall?.team || 0) ||
              ''
          ][chall?.flagstore || ''][chall?.tick || 0] = chall;
        }
      } else {
        nchalls[
          Number(chall?.target_ip?.split('.')[2]) ||
            Math.floor(chall?.team || 0) ||
            ''
        ][chall?.flagstore || ''][chall?.tick || 0] = chall;
      }
    } catch (err) {
      continue;
    }
  }
  return nchalls;
};
