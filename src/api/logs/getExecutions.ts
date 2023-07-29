import { CONFIG } from 'utils/constants';
import { ExecutionType } from 'utils/types';

const getExecutions = async (since?: number) => {
  return await fetch(
    `${CONFIG.MGMT_SERVER_URL}/logs/executions${since ? `?since=${since}` : ''}`
  )
    .then((res) => res.json())
    .then((data: { status: 'ok' | 'error'; data: ExecutionType[] }) => {
      if (data.status === 'error') return null;
      return data.data;
    })
    .catch((_err) => null)
    .finally(() => null);
};

export default getExecutions;
