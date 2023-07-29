import Navigation from 'components/Navigation';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  currentTickAtom,
  executionLogAtom,
  exploitsAtom,
  scoreboardDataAtom,
  flagLogAtom,
} from 'utils/atoms';
import { CONFIG, SERVICE_STATUS } from 'utils/constants';
import {
  ExecutionType,
  ExploitType,
  FlagType,
  ScoreboardType,
} from 'utils/types';
import { toUnixTimestamp } from 'utils/utils';

export default function Layout({ children }: { children: ReactNode }) {
  const [scoreboardData, setScoreboardData] = useAtom(scoreboardDataAtom);
  const [flagLog, setFlagLog] = useAtom(flagLogAtom);
  const [executionLog, setExecutionLog] = useAtom(executionLogAtom);
  const [exploits, setExploits] = useAtom(exploitsAtom);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentTick, setCurrentTick] = useAtom(currentTickAtom);

  useEffect(() => {
    // const newSocket = io(`${CONFIG.MGMT_SERVER_URL}`);
    // setSocket(newSocket);
    if (!scoreboardData)
      fetch(`${CONFIG.MGMT_SERVER_URL}/info/teams`)
        .then((res) => res.json())
        .then(
          (teamData: {
            status: 'ok' | 'error';
            data: { ip: string; name?: string }[];
          }) => {
            if (teamData.status === 'error') return;

            fetch(`${CONFIG.MGMT_SERVER_URL}/info/services`)
              .then((res) => res.json())
              .then(
                (serviceData: {
                  status: 'ok' | 'error';
                  data: { name: string }[];
                }) => {
                  if (serviceData.status === 'error') return;
                  const services = Object.fromEntries(
                    serviceData.data.map((service) => [
                      service.name,
                      SERVICE_STATUS.UP,
                    ])
                  );
                  const scoreboardData = {
                    teams: Object.fromEntries(
                      teamData.data.map((team) => [
                        team.ip,
                        { ...team, services },
                      ])
                    ),
                  };
                  setScoreboardData(scoreboardData as ScoreboardType);
                }
              )
              .catch((_err) => {});
          }
        )
        .catch((_err) => {});
    if (currentTick === 0)
      fetch(`${CONFIG.MGMT_SERVER_URL}/info/internal_tick`)
        .then((res) => res.json())
        .then((data: { status: 'ok' | 'error'; data: number }) => {
          if (data.status === 'error') return;
          setCurrentTick(data.data);
        })
        .catch((_err) => {});
    if (!flagLog && executionLog)
      fetch(`${CONFIG.MGMT_SERVER_URL}/logs/flags`)
        .then((res) => res.json())
        .then((data: { status: 'ok' | 'error'; data: FlagType[] }) => {
          if (data.status === 'error') return;
          setFlagLog(data.data);
        })
        .catch((_err) => {});
    if (!executionLog)
      fetch(`${CONFIG.MGMT_SERVER_URL}/logs/executions`)
        .then((res) => res.json())
        .then((data: { status: 'ok' | 'error'; data: ExecutionType[] }) => {
          if (data.status === 'error') return;
          setExecutionLog(data.data);
        })
        .catch((_err) => {});
    if (!exploits)
      fetch(`${CONFIG.MGMT_SERVER_URL}/logs/exploits`)
        .then((res) => res.json())
        .then((data: { status: 'ok' | 'error'; data: ExploitType[] }) => {
          if (data.status === 'error') return;
          setExploits(data.data);
        })
        .catch((_err) => {});

    let fastInterval: number;
    let slowInterval: number;
    if (
      flagLog &&
      flagLog.length > 0 &&
      executionLog &&
      executionLog.length > 0 &&
      exploits
    ) {
      //Implementing the setInterval method
      fastInterval = setInterval(() => {
        // Poll ticks
        fetch(`${CONFIG.MGMT_SERVER_URL}/info/internal_tick`)
          .then((res) => res.json())
          .then((data: { status: 'ok' | 'error'; data: number }) => {
            if (data.status === 'error') return;
            setCurrentTick(data.data);
          })
          .catch((_err) => {});

        // Poll flags
        fetch(
          `${CONFIG.MGMT_SERVER_URL}/logs/flags?since=${toUnixTimestamp(
            flagLog[flagLog.length - 10]?.timestamp
          )}`
        )
          .then((res) => res.json())
          .then((data: { status: 'ok' | 'error'; data: FlagType[] }) => {
            if (data.status === 'error') return;
            setFlagLog((flag) => {
              const newData = data.data.filter(
                (d) =>
                  !flag?.find((s) => s.id === d.id) && String(d.status) !== ''
              );
              newData.sort((a, b) => {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
              });
              return [...(flag ?? []), ...newData];
            });
          })
          .catch((_err) => {});

        // Poll executions
        fetch(
          `${CONFIG.MGMT_SERVER_URL}/logs/executions?since=${toUnixTimestamp(
            executionLog[executionLog.length - 1]?.started_at
          )}`
        )
          .then((res) => res.json())
          .then((data: { status: 'ok' | 'error'; data: ExecutionType[] }) => {
            if (data.status === 'error') return;
            setExecutionLog((ex) => {
              const newData = data.data.filter(
                (d) => !ex?.find((e) => e.id === d.id)
              );
              return [...(ex ?? []), ...newData];
            });
          })
          .catch((_err) => {});

        // Poll exploits
        fetch(`${CONFIG.MGMT_SERVER_URL}/logs/exploits`)
          .then((res) => res.json())
          .then((data: { status: 'ok' | 'error'; data: ExploitType[] }) => {
            if (data.status === 'error') return;
            setExploits(data.data);
          })
          .catch((_err) => {});
      }, 1000);

      slowInterval = setInterval(() => {
        // Poll scoreboard data
        fetch(`${CONFIG.MGMT_SERVER_URL}/info/teams`)
          .then((res) => res.json())
          .then(
            (teamData: {
              status: 'ok' | 'error';
              data: { ip: string; name?: string }[];
            }) => {
              if (teamData.status === 'error') return;

              fetch(`${CONFIG.MGMT_SERVER_URL}/info/services`)
                .then((res) => res.json())
                .then(
                  (serviceData: {
                    status: 'ok' | 'error';
                    data: { name: string }[];
                  }) => {
                    if (serviceData.status === 'error') return;
                    const services = Object.fromEntries(
                      serviceData.data.map((service) => [
                        service.name,
                        SERVICE_STATUS.UP,
                      ])
                    );
                    const scoreboardData = {
                      teams: Object.fromEntries(
                        teamData.data.map((team) => [
                          team.ip,
                          { ...team, services },
                        ])
                      ),
                    };
                    setScoreboardData(scoreboardData as ScoreboardType);
                  }
                )
                .catch((_err) => {});
            }
          )
          .catch((_err) => {});
      }, 10000);
    }
    return () => {
      clearInterval(fastInterval);
      clearInterval(slowInterval);
      // newSocket.close();
    };
  }, [
    executionLog,
    exploits,
    scoreboardData,
    setExecutionLog,
    setExploits,
    setScoreboardData,
    setFlagLog,
    flagLog,
    setCurrentTick,
    currentTick,
  ]);

  useEffect(() => {
    if (!socket || true) return;
    socket.on('scoreboard', (data: ScoreboardType) => {
      if (data?.teams) setScoreboardData(data);
      // if (Number(data?.currentTick)) setCurrentTick(Number(data.currentTick));
    });
    socket.on('flag', (data: FlagType[]) => {
      if (data?.length > 0) {
        setFlagLog((flag) => {
          const newData = data.filter(
            (d) => !flag?.find((s) => s.text === d.text)
          );
          return [...(flag ?? []), ...newData];
        });
      }
    });
    socket.on('execution', (data: ExecutionType[]) => {
      if (data?.length > 0)
        setExecutionLog((ex) => {
          const newData = data.filter((d) => !ex?.find((e) => e.id === d.id));
          return [...(ex ?? []), ...newData];
        });
    });
    socket.on('exploits', (data: ExploitType[]) => {
      if (data?.length > 0)
        setExploits((ex) => {
          const newData = data.filter((d) => !ex?.find((e) => e.id === d.id));
          return [...(ex ?? []), ...newData];
        });
    });
    socket.on('tick', (data: number) => {
      if (data) setCurrentTick(data);
    });

    return () => {
      socket.off('scoreboard');
      socket.off('flag');
      socket.off('execution');
      socket.off('exploits');
      socket.off('tick');
    };
  }, [
    socket,
    setScoreboardData,
    setFlagLog,
    setExecutionLog,
    setExploits,
    setCurrentTick,
  ]);

  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
      <Navigation />
      {children}
    </main>
  );
}
