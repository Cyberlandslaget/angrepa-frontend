import { useAtom, useAtomValue } from 'jotai';
import { currentTickAtom, extendedSelectionAtom } from 'utils/atoms';
import { removeSimpleDuplicates } from 'utils/removeSimpleDuplicates';
import { SERVICE_STATUS } from 'utils/constants';
import { FlagType, ScoreboardType } from 'utils/types';
import getFlagIcon from 'utils/getFlagIcon';
import { useEffect, useRef } from 'react';
import { DragDirection, ExtendedType } from 'utils/enums';
import useResizeableComponent from 'utils/useResizeableComponent';
import { useVirtualizer } from '@tanstack/react-virtual';

type Data = {
  [key: string]: {
    [key: string]: FlagType;
  };
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
  const resizableRef = useRef<HTMLDivElement | null>(null);
  const { setActiveHandler } = useResizeableComponent(resizableRef);

  const currentTick = useAtomValue(currentTickAtom);

  // The scrollable element for your list
  const parentRef = useRef(null);
  // The virtualizer
  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: currentTick,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28,
    overscan: 5,
  });

  const total = 5;
  const teams = Object.entries(data?.scoreboard?.teams);
  const services = Object.keys(
    Object.values(data.scoreboard.teams)[0].services
  );
  const filteredData = removeSimpleDuplicates(
    Object.keys(data.scoreboard.teams),
    services,
    data.flag,
    currentTick
  );

  useEffect(() => {
    if (!extended && extendedSelection.type !== null)
      setExtendedSelection({ type: null, selection: null });
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
              <p
                key={`team_${team[0]}_overview`}
                id={team[0]}
                className={`flex items-center text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all ${
                  extended
                    ? 'hover:brightness-125 hover:bg-opacity-80 cursor-pointer'
                    : ''
                } ${
                  extendedSelection.selection === String(teamIndex)
                    ? '!bg-opacity-90'
                    : ''
                }`}
                title={team[0]}
                onClick={() => {
                  if (!extended) return;
                  setExtendedSelection({
                    type: ExtendedType.Team,
                    selection: String(teamIndex),
                  });
                }}
              >
                {team[0]}. {team[1].name}
              </p>
            ))}
          </div>

          <div className="flex gap-1 overflow-auto w-full pb-1">
            {services.map((service) => (
              <div
                key={`service_${service}_overview`}
                className="flex flex-col gap-1"
              >
                <p
                  className={`flex w-44 mb-1 items-center justify-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all ${
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
                      className={`flex flex-row-reverse items-center justify-center text-sm p-2 h-[2.1rem] bg-slate-950 bg-opacity-20 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden ${
                        team[1].services[service] === SERVICE_STATUS.UP ||
                        team[1].services[service] === SERVICE_STATUS.RECOVERING
                          ? ''
                          : team[1].services[service] === SERVICE_STATUS.DOWN
                          ? 'border-red-400 border-opacity-50'
                          : 'border-yellow-400 border-opacity-50'
                      }`}
                    >
                      <SimpleOverview
                        data={filteredData[team[0]][service] as Data}
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
        <div className="tertiaryColor w-full h-full rounded-md overflow-auto">
          <div className={`flex flex-col rounded-md`}>
            <h2 className="text-center font-semibold text-xl mt-1 mb-3">
              {extendedSelection.type === ExtendedType.Team
                ? teams[Number(extendedSelection.selection)][1].name
                : extendedSelection.selection}
            </h2>

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
                        className={`flex items-center text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all`}
                      >
                        {service}
                      </p>
                    ))
                  : Object.values(teams).map((team) => (
                      <p
                        key={`team_${team[0]}_extended`}
                        id={team[0]}
                        className={`flex items-center text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all`}
                      >
                        {team[1].name}
                      </p>
                    ))}
              </div>

              {/* The scrollable element for your list */}
              <div
                className="flex overflow-auto w-full h-[calc(100%+1rem)]"
                ref={parentRef}
              >
                <div className="flex flex-col gap-1 w-full">
                  <p
                    className={`absolute top-0 right-0 flex w-[calc(100%-12.25rem)] mb-1 items-center font-bold text-sm p-2 h-[2.1rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all`}
                  >
                    Status
                  </p>

                  {/* The large inner element to hold all of the items */}
                  <div
                    className="flex gap-[2px] mt-[2.6rem]"
                    style={{
                      width: `${columnVirtualizer.getTotalSize()}px`,
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                    {columnVirtualizer.getVirtualItems().map((virtualItem) => (
                      <div
                        key={virtualItem.key}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${virtualItem.size}px`,
                          transform: `translateX(${virtualItem.start}px)`,
                        }}
                        className="flex flex-col gap-1"
                      >
                        <p
                          className={`flex w-full mb-1 items-center justify-center text-xs h-[1.25rem] shadow-inner bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden transition-all ${
                            (currentTick - virtualItem.index) % 2 === 0
                              ? 'text-indigo-300'
                              : 'text-indigo-100'
                          }`}
                        >
                          <span>{currentTick - virtualItem.index}</span>
                        </p>
                        {extendedSelection.type === ExtendedType.Team
                          ? services.map((service) => (
                              <p
                                key={`service_${service}_extended_${
                                  currentTick - virtualItem.index
                                }`}
                                className="flex h-[2.1rem] bg-slate-950 bg-opacity-20 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden"
                              >
                                <SimpleOverview
                                  data={
                                    filteredData[
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
                                  currentTick={currentTick - virtualItem.index}
                                  total={1}
                                />
                              </p>
                            ))
                          : Object.keys(teams).map((team) => (
                              <p
                                key={`team_${team}_extended_${
                                  currentTick - virtualItem.index
                                }`}
                                className="flex h-[2.1rem] bg-slate-950 bg-opacity-20 border-slate-950 border-opacity-20 border-2 rounded-sm text-ellipsis whitespace-nowrap overflow-hidden"
                              >
                                <SimpleOverview
                                  data={
                                    filteredData[teams[Number(team)][0]][
                                      String(extendedSelection.selection)
                                    ] as Data
                                  }
                                  status={
                                    teams[Number(team)][1].services[
                                      String(extendedSelection.selection)
                                    ]
                                  }
                                  currentTick={currentTick - virtualItem.index}
                                  total={1}
                                />
                              </p>
                            ))}
                      </div>
                    ))}
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
