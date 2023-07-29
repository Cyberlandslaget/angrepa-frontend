import { CONFIG } from 'utils/constants';

const getTicks = async () => {
  return await fetch(`${CONFIG.MGMT_SERVER_URL}/info/internal_tick`)
    .then((res) => res.json())
    .then((data: { status: 'ok' | 'error'; data: number }) => {
      if (data.status === 'error') return 0;
      return data.data;
    })
    .catch((_err) => 0)
    .finally(() => 0);
};

export default getTicks;
