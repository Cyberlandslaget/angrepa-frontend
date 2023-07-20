import { useAtomValue } from 'jotai';
import { currentTickAtom } from 'utils/atoms';
import { removeDuplicates } from 'utils/utils';
import { SERVICE_STATUS } from 'utils/constants';
import { DataType } from 'utils/types';
import getFlagIcon from 'utils/getFlagIcon';

type SimpleOverviewProps = {
  data: DataType[];
  status: number;
  currentTick: number;
  total: number;
  force?: boolean;
};
const SimpleOverview = ({
  data,
  status,
  currentTick,
  total,
  force = false,
}: SimpleOverviewProps) => {
  const logs = Object.values(data).splice(
    Math.max(currentTick - total, 0),
    currentTick - total > 0 ? total : currentTick
  );

  return (
    <>
      {status === SERVICE_STATUS.UP ||
      status === SERVICE_STATUS.RECOVERING ||
      force ? (
        logs.map((log, index) => (
          <span key={Math.random()} className="flex items-center">
            {getFlagIcon(log, currentTick - total + index + 1)}
          </span>
        ))
      ) : (
        <>w0t</>
      )}
    </>
  );
};

type SimpleDisplayProps = {
  data: {
    scoreboard: {
      currentTick: number;
      teams: {
        [key: string]: {
          name: string;
          services: {
            [key: string]: number;
          };
        };
      };
    };
    flag: DataType[];
  };
};
const SimpleDisplay = ({ data }: SimpleDisplayProps) => {
  const currentTick = useAtomValue(currentTickAtom);
  const total = 5;

  const teams = Object.entries(data?.scoreboard?.teams);
  const services = Object.keys(
    Object.values(data.scoreboard.teams)[0].services
  );
  const filteredData = removeDuplicates(
    Object.keys(data.scoreboard.teams),
    services,
    data.flag,
    currentTick
  );

  return (
    <div className="wrapper flex my-1">
      <div className="grid [grid-template-columns:11.5rem_1fr] gap-2">
        <div className="flex flex-col gap-1">
          <p className="flex mb-1 items-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden">
            Team
          </p>
          {teams.map((team) => (
            <p
              key={`team_${team[0]}_overview`}
              id={team[0]}
              className="flex items-center text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden"
              title={team[0]}
            >
              {team[1].name}
            </p>
          ))}
        </div>

        <div className="flex gap-1 overflow-auto w-full pb-1">
          {services.map((service) => (
            <div key={service + '1'} className="flex flex-col gap-1">
              <p className="flex w-44 mb-1 items-center justify-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden">
                {service}
              </p>
              {teams.map((team) => {
                return (
                  <p
                    key={`service_${team[0]}_overview`}
                    className="flex items-center justify-center text-sm p-2 h-[2.1rem] bg-slate-950 bg-opacity-20 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden"
                  >
                    <SimpleOverview
                      data={filteredData[team[0]][service] as DataType[]}
                      status={team[1].services[service]}
                      currentTick={currentTick}
                      total={total}
                    />
                  </p>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SimpleDisplay;
