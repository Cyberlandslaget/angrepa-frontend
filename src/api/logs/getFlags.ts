import { CONFIG } from 'utils/constants';
import { FlagType } from 'utils/types';

const getFlags = async (since?: number) => {
  return await fetch(
    `${CONFIG.MGMT_SERVER_URL}/logs/flags${since ? `?since=${since}` : ''}`
  )
    .then((res) => res.json())
    .then((data: { status: 'ok' | 'error'; data: FlagType[] }) => {
      if (data.status === 'error') return null;
      return data.data;
    })
    .catch((_err) => null)
    .finally(() => null);
};

export default getFlags;
