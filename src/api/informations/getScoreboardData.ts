import { CONFIG, SERVICE_STATUS } from 'utils/constants';
import { ScoreboardType } from 'utils/types';

const getScoreboardData = async () => {
  return await fetch(`${CONFIG.MGMT_SERVER_URL}/info/teams`)
    .then((res) => res.json())
    .then(
      async (teamData: {
        status: 'ok' | 'error';
        data: { ip: string; name?: string }[];
      }) => {
        if (teamData.status === 'error') return null;

        return await fetch(`${CONFIG.MGMT_SERVER_URL}/info/services`)
          .then((res) => res.json())
          .then(
            (serviceData: {
              status: 'ok' | 'error';
              data: { name: string }[];
            }) => {
              if (serviceData.status === 'error') return null;
              const services = Object.fromEntries(
                serviceData.data.map((service) => [
                  service.name,
                  SERVICE_STATUS.UP,
                ])
              );
              return {
                teams: Object.fromEntries(
                  teamData.data.map((team) => [team.ip, { ...team, services }])
                ),
              } as ScoreboardType;
            }
          )
          .catch((_err) => null)
          .finally(() => null);
      }
    )
    .catch((_err) => null)
    .finally(() => null);
};

export default getScoreboardData;
