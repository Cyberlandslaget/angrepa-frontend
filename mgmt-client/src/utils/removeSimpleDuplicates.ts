import { FLAG_CODE } from './constants';
import { FlagCodeType, FlagType } from './types';

type Ticks = {
  [key: number]: FlagType | null;
};
type ServiceTicks = {
  [key: string]: Ticks;
};
type Challenges = {
  [key: string]: ServiceTicks;
};

export const removeSimpleDuplicates = (
  teams: string[],
  services: string[],
  challs: FlagType[],
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
      const exists = nchalls[chall?.team || ''];
      if (exists) {
        nexists = exists[chall?.service || ''];
        if (nexists) nnexists = nexists[chall?.target_tick || 0];
      }

      if (nnexists) {
        if (
          FLAG_CODE[chall.status as FlagCodeType] >
          FLAG_CODE[nnexists.status as FlagCodeType]
        )
          nchalls[chall?.team][chall?.service][chall?.target_tick] = chall;
      } else {
        nchalls[chall?.team][chall?.service][chall?.target_tick] = chall;
      }
    } catch (_err) {
      continue;
    }
  }
  return nchalls;
};
