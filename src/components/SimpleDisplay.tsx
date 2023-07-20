import { useAtomValue } from 'jotai';
import { currentTickAtom } from '../utils/atoms';
import { removeDuplicates } from '../utils/utils';
import { FLAG_CODE, SERVICE_STATUS } from '../utils/constants';
import { DataType, FlagCodeType, ServiceStatusType } from '../utils/types';

export const displayFlagCode = (chall: DataType, tick: number) => {
  switch (FLAG_CODE[chall?.code as FlagCodeType]) {
    case FLAG_CODE.OK:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-[1.15rem] h-[1.15rem] p-[1.5px]"
          style={{
            background: 'var(--greenBg)',
            color: 'var(--greenText)',
            borderRadius: 2,
            fontSize: '1.2rem',
            margin: '0px 3px',
          }}
        >
          <title>OK ({tick})</title>
          <path
            fill="currentColor"
            d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          ></path>
        </svg>
      );
    case FLAG_CODE.DUP:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-[1.15rem] h-[1.15rem] p-[1.5px]"
          style={{
            background: 'var(--yellowBg)',
            color: 'var(--yellowText)',
            borderRadius: 2,
            fontSize: '1.2rem',
            margin: '0px 3px',
          }}
        >
          <title>DUP ({tick})</title>
          <path
            fill="currentColor"
            d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
          ></path>
        </svg>
      );
    case FLAG_CODE.OLD:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-[1.15rem] h-[1.15rem] p-[1.5px]"
          style={{
            background: 'var(--yellowBg)',
            color: 'var(--yellowText)',
            borderRadius: 2,
            fontSize: '1.2rem',
            margin: '0px 3px',
          }}
        >
          <title>OLD ({tick})</title>
          <path
            fill="currentColor"
            d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"
          ></path>
        </svg>
      );
    case FLAG_CODE.INV:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="w-[1.15rem] h-[1.15rem] p-[1.5px]"
          style={{
            background: 'var(--redBg)',
            color: 'var(--redText)',
            borderRadius: 2,
            fontSize: '1.2rem',
            margin: '0px 3px',
          }}
        >
          <title>INV ({tick})</title>
          <path
            fill="currentColor"
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          ></path>
        </svg>
      );
    case FLAG_CODE.ERR:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 512"
          className="w-[1.15rem] h-[1.15rem] p-[1.5px]"
          style={{
            background: 'var(--redBg)',
            color: 'var(--redText)',
            borderRadius: 2,
            fontSize: '1.2rem',
            margin: '0px 3px',
          }}
        >
          <title>ERR ({tick})</title>
          <path
            fill="currentColor"
            d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM64 480c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z"
          ></path>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="w-[1.15rem] h-[1.15rem] p-[1.5px]"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            color: 'transparent',
            borderRadius: 2,
            fontSize: '1.2rem',
            margin: '0px 3px',
          }}
        >
          <title>NONE ({tick})</title>
          <path
            fill="currentColor"
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          ></path>
        </svg>
      );
  }
};

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
            {displayFlagCode(log, currentTick - total + index + 1)}
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
