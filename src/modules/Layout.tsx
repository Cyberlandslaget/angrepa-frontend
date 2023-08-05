import getScoreboardData from 'api/informations/getScoreboardData';
import getTicks from 'api/informations/getTicks';
import getExecutions from 'api/logs/getExecutions';
import getExploits from 'api/logs/getExploits';
import getFlags from 'api/logs/getFlags';
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
  const [socket, _setSocket] = useState<Socket | null>(null);
  const [currentTick, setCurrentTick] = useAtom(currentTickAtom);

  useEffect(() => {
    // const newSocket = io(`${CONFIG.MGMT_SERVER_URL}`);
    // setSocket(newSocket);
    // First poll
    const fourHoursAgo = Math.floor(new Date().getTime() / 1000) - 3600 * 4;
    if (!scoreboardData)
      getScoreboardData()
        .then((data) => setScoreboardData(data))
        .catch((_e) => {});
    if (currentTick === 0)
      getTicks()
        .then((data) => setCurrentTick(data))
        .catch((_e) => {});
    if (!executionLog)
      getExecutions(fourHoursAgo)
        .then((data) => setExecutionLog(data))
        .catch((_e) => {});
    if (!flagLog && executionLog)
      getFlags(fourHoursAgo)
        .then((data) => setFlagLog(data))
        .catch((_e) => {});
    if (!exploits)
      getExploits()
        .then((data) => setExploits(data))
        .catch((_e) => {});

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
        getTicks()
          .then((data) => setCurrentTick(data))
          .catch((_e) => {});
        // Poll executions
        getExecutions(
          toUnixTimestamp(executionLog[executionLog.length - 1]?.started_at)
        )
          .then((data) => {
            setExecutionLog((ex) => {
              const newData = data?.filter(
                (d) => !ex?.find((e) => e.id === d.id)
              );
              return [...(ex ?? []), ...(newData ?? [])];
            });
          })
          .catch((_e) => {});
        // Poll flags
        getFlags(toUnixTimestamp(flagLog[flagLog.length - 10]?.timestamp))
          .then((data) => {
            setFlagLog((flag) => {
              const newData = data?.filter(
                (d) =>
                  !flag?.find((s) => s.id === d.id) && String(d.status) !== ''
              );
              newData?.sort((a, b) => {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
              });
              return [...(flag ?? []), ...(newData ?? [])];
            });
          })
          .catch((_e) => {});
        // Poll exploits
        getExploits()
          .then((data) => setExploits(data))
          .catch((_e) => {});
      }, 1000);

      slowInterval = setInterval(() => {
        // Poll scoreboard data
        getScoreboardData()
          .then((data) => setScoreboardData(data))
          .catch((_e) => {});
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

  /*
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
  */

  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
      <Navigation />
      {children}
    </main>
  );
}
