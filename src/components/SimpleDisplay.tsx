import { useAtom, useAtomValue } from 'jotai';
import {
  currentTickAtom,
  exploitsAtom,
  extendedSelectionAtom,
} from 'utils/atoms';
import { removeSimpleDuplicates } from 'utils/removeSimpleDuplicates';
import { SERVICE_STATUS } from 'utils/constants';
import { FlagType, ScoreboardType } from 'utils/types';
import getFlagIcon from 'utils/getFlagIcon';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DragDirection, ExtendedType } from 'utils/enums';
import useResizeableComponent from 'utils/useResizeableComponent';
import { FixedSizeList as List } from 'react-window';

type Data = {
  [key: number]: FlagType;
};
type SimpleOverviewProps = {
  data: Data;
  status: number;
  currentTick: number;
  total: number;
};
const SimpleOverview = ({
  data,
  status: _,
  currentTick,
  total,
}: SimpleOverviewProps) => {
  const logs = Object.values(data).splice(
    Math.max(currentTick - total, 0),
    currentTick - total > 0 ? total : currentTick
  );

  return (
    <>
      {logs.map((log, index) => (
        <span key={Math.random()} className="flex items-center">
          {getFlagIcon(log, currentTick - total + index + 1)}
        </span>
      ))}
    </>
  );
};

type SimpleDisplayProps = {
  extended: boolean;
  data: {
    scoreboard: ScoreboardType;
    flag: FlagType[];
  };
};
const SimpleDisplay = ({ data, extended }: SimpleDisplayProps) => {
  const [extendedSelection, setExtendedSelection] = useAtom(
    extendedSelectionAtom
  );
  const [exploits, _setExploits] = useAtom(exploitsAtom);
  const [filteredExploit, setFilteredExploit] = useState(0);
  const filteredBlacklist = useMemo(() => {
    if (exploits) {
      if (filteredExploit === 0)
        return exploits
          .filter((e) => e.service === String(extendedSelection?.selection))
          .flatMap((e) => e.blacklist);
      return exploits.find((e) => e.id === filteredExploit)?.blacklist;
    }
    return [];
  }, [filteredExploit, exploits, extendedSelection]);

  const resizableRef = useRef<HTMLDivElement | null>(null);
  const { setActiveHandler } = useResizeableComponent(resizableRef);

  const currentTick = useAtomValue(currentTickAtom);

  const total = 5;
  const teams = Object.entries(data?.scoreboard?.teams);
  const services = Object.keys(
    Object.values(data.scoreboard.teams)[0].services
  );

  const filteredExploitData = useMemo(() => {
    return removeSimpleDuplicates(
      Object.keys(data.scoreboard.teams),
      services,
      data.flag,
      currentTick,
      filteredExploit || undefined
    );
  }, [
    currentTick,
    data.flag,
    data.scoreboard.teams,
    filteredExploit,
    services,
  ]);

  useEffect(() => {
    if (!extended && extendedSelection.type !== null) {
      setExtendedSelection({ type: null, selection: null });
      setFilteredExploit(0);
    }
  }, [extended, extendedSelection, setExtendedSelection]);

  return (
    <div
      ref={resizableRef}
      className={`relative wrapper grid [grid-template-rows:1fr_0.2rem_45%] my-1 gap-2 ${
        extended ? 'h-[calc(100%-1.5rem)]' : ''
      }`}
    >
      <div
        className={
          extended && extendedSelection.type !== null
            ? 'tertiaryColor w-full h-full rounded-md overflow-auto'
            : ''
        }
      >
        <div className="grid [grid-template-columns:11.75rem_1fr] gap-2 min-h-0">
          <div className="flex flex-col gap-1">
            <p className="flex mb-1 items-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden">
              Team
            </p>
            {teams.map((team, teamIndex) => (
              <div
                key={`team_${team[0]}_overview`}
                id={team[0]}
                className={`flex items-center text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm transition-all duration-150 ${
                  extended
                    ? 'hover:brightness-125 hover:bg-opacity-80 cursor-pointer'
                    : ''
                } ${
                  extendedSelection.selection === String(teamIndex)
                    ? '!bg-opacity-90'
                    : ''
                }`}
                title={`[${team[0]}] ${team[1].name ?? ''}`}
                onClick={() => {
                  if (!extended) return;
                  setExtendedSelection({
                    type: ExtendedType.Team,
                    selection: String(teamIndex),
                  });
                }}
              >
                <p className="truncate">
                  [{team[0]}] {team[1].name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-1 overflow-auto w-full pb-1">
            {services.map((service) => (
              <div
                key={`service_${service}_overview`}
                className="flex flex-col gap-1"
              >
                <p
                  className={`flex w-44 mb-1 items-center justify-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-150 ${
                    extended
                      ? 'hover:brightness-125 hover:bg-opacity-80 cursor-pointer'
                      : ''
                  } ${
                    extendedSelection.selection === service
                      ? '!bg-opacity-90'
                      : ''
                  }`}
                  onClick={() => {
                    if (!extended) return;
                    setExtendedSelection({
                      type: ExtendedType.Service,
                      selection: service,
                    });
                  }}
                >
                  {service}
                </p>
                {teams.map((team) => {
                  return (
                    <p
                      key={`service_${team[0]}_overview`}
                      className={`flex flex-row items-center justify-center text-sm p-2 h-[2.1rem] bg-slate-950 bg-opacity-20 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden ${
                        team[1].services[service] === SERVICE_STATUS.UP ||
                        team[1].services[service] === SERVICE_STATUS.RECOVERING
                          ? ''
                          : team[1].services[service] === SERVICE_STATUS.DOWN
                          ? 'border-red-400 border-opacity-50'
                          : 'border-yellow-400 border-opacity-50'
                      }`}
                    >
                      <SimpleOverview
                        data={filteredExploitData[team[0]][service] as Data}
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

      <div
        className={`w-full h-full tertiaryColor brightness-125 cursor-row-resize ${
          extended && extendedSelection.type !== null
            ? ''
            : 'opacity-0 pointer-events-none'
        }`}
        onMouseDown={() => setActiveHandler(DragDirection.Row)}
      ></div>

      {extended && extendedSelection.type !== null && (
        <div className="tertiaryColor relative w-full h-full rounded-md overflow-auto">
          <div className={`flex flex-col rounded-md`}>
            <h2 className="text-center font-semibold text-xl mt-1 mb-3">
              {extendedSelection.type === ExtendedType.Team
                ? `[${teams[Number(extendedSelection.selection)][0]}] ${String(
                    teams[Number(extendedSelection.selection)][1].name
                  )} `
                : extendedSelection.selection}
            </h2>
            {extendedSelection.type === ExtendedType.Service && (
              <div className="absolute right-3 top-2">
                Exploit:{' '}
                {exploits && exploits?.length > 0 ? (
                  <select
                    className="bg-slate-900 py-1 px-2 text-white rounded-sm text-md"
                    value={filteredExploit}
                    onChange={({ target }) => {
                      setFilteredExploit(Number(target.value));
                    }}
                  >
                    <option value={0}>All</option>
                    {exploits
                      .filter((e) => e.service === extendedSelection.selection)
                      .map((exploit) => (
                        <option key={exploit.id} value={exploit.id}>
                          {exploit.name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <></>
                )}
              </div>
            )}

            <div className="relative grid [grid-template-columns:11.75rem_1fr] gap-2 min-h-0">
              <div className="flex flex-col gap-1">
                <p className="flex mb-1 items-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden">
                  Services
                </p>
                <p className="flex w-full mb-1 items-center justify-center text-xs h-[1.25rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all"></p>
                {extendedSelection.type === ExtendedType.Team
                  ? services.map((service) => (
                      <p
                        key={`service_${service}_extended`}
                        id={service}
                        className={`flex items-center text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm truncate transition-all`}
                      >
                        {service}
                      </p>
                    ))
                  : Object.values(teams).map((team) => (
                      <p
                        key={`team_${team[0]}_extended`}
                        id={team[0]}
                        className={`flex items-center text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm truncate transition-all ${
                          filteredBlacklist?.includes(team[0])
                            ? 'opacity-50 !bg-black brightness-75'
                            : ''
                        }`}
                      >
                        {team[0]} {team[1].name}
                      </p>
                    ))}
              </div>

              <div className="flex overflow-auto w-full h-[calc(100%+1rem)]">
                <div className="flex flex-col gap-1 w-full">
                  <p
                    className={`absolute top-0 right-0 flex w-[calc(100%-12.25rem)] mb-1 items-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all`}
                  >
                    Status
                  </p>

                  <div className="flex gap-[2px] mt-[2.6rem] w-full h-full">
                    <List
                      height={
                        extendedSelection.type === ExtendedType.Service
                          ? 40 * teams.length + 15
                          : 60 * services.length + 15
                      }
                      itemCount={currentTick}
                      itemSize={28}
                      width={window.innerWidth - 196}
                      layout="horizontal"
                      direction="rtl"
                    >
                      {({ index, style }) => (
                        <div
                          key={`key-${index}`}
                          style={{
                            ...style,
                          }}
                          className="flex flex-col gap-1 "
                        >
                          <p
                            className={`flex w-full mb-1 items-center justify-center text-xs h-[1.25rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm transition-all ${
                              (currentTick - index) % 2 === 0
                                ? 'text-indigo-300'
                                : 'text-indigo-100'
                            }`}
                          >
                            <span>{currentTick - index}</span>
                          </p>
                          {extendedSelection.type === ExtendedType.Team
                            ? services.map((service) => (
                                <p
                                  title={String(currentTick - index)}
                                  key={`service_${service}_extended_${
                                    currentTick - index
                                  }`}
                                  className="flex justify-center items-center h-[2.1rem] bg-slate-950 bg-opacity-20 border-slate-950 border-opacity-20 border-2 rounded-sm truncate"
                                >
                                  <SimpleOverview
                                    data={
                                      filteredExploitData[
                                        teams[
                                          Number(extendedSelection.selection)
                                        ][0]
                                      ][service] as Data
                                    }
                                    status={
                                      teams[
                                        Number(extendedSelection.selection)
                                      ][1].services[service]
                                    }
                                    currentTick={currentTick - index}
                                    total={1}
                                  />
                                </p>
                              ))
                            : Object.keys(teams).map((team) => (
                                <p
                                  key={`team_${team}_extended_${
                                    currentTick - index
                                  }`}
                                  className={`flex h-[2.1rem] bg-slate-950 bg-opacity-20 border-slate-950 border-opacity-20 border-2 rounded-sm truncate ${
                                    filteredBlacklist?.includes(
                                      teams[Number(team)][0]
                                    )
                                      ? 'opacity-50 !bg-black brightness-75'
                                      : ''
                                  }`}
                                >
                                  <SimpleOverview
                                    data={
                                      filteredExploitData[
                                        teams[Number(team)][0]
                                      ][
                                        String(extendedSelection.selection)
                                      ] as Data
                                    }
                                    status={
                                      teams[Number(team)][1].services[
                                        String(extendedSelection.selection)
                                      ]
                                    }
                                    currentTick={currentTick - index}
                                    total={1}
                                  />
                                </p>
                              ))}
                        </div>
                      )}
                    </List>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SimpleDisplay;
