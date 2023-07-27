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
import { CONFIG } from 'utils/constants';
import {
  ExecutionType,
  ExploitType,
  FlagType,
  ScoreboardType,
} from 'utils/types';

export default function Layout({ children }: { children: ReactNode }) {
  const [scoreboardData, setScoreboardData] = useAtom(scoreboardDataAtom);
  const [flagLog, setFlagLog] = useAtom(flagLogAtom);
  const [executionLog, setExecutionLog] = useAtom(executionLogAtom);
  const [exploits, setExploits] = useAtom(exploitsAtom);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [_, setCurrentTick] = useAtom(currentTickAtom);

  useEffect(() => {
    const newSocket = io(`${CONFIG.MGMT_SERVER_URL}`);
    setSocket(newSocket);
    if (!scoreboardData)
      fetch(`${CONFIG.MGMT_SERVER_URL}/api/scoreboard`)
        .then((res) => res.json())
        .then((data) => {
          setScoreboardData(data as ScoreboardType);
        })
        .catch((_err) => {});
    if (!flagLog)
      fetch(`${CONFIG.MGMT_SERVER_URL}/logs/flags`)
        .then((res) => res.json())
        .then((data: { status: 'ok' | 'error'; data: FlagType[] }) => {
          setFlagLog(data.data);
        })
        .catch((_err) => {});
    if (!executionLog)
      fetch(`${CONFIG.MGMT_SERVER_URL}/logs/executions`)
        .then((res) => res.json())
        .then((data: { status: 'ok' | 'error'; data: unknown[] }) => {
          const d = data.data.map((d) => {
            return {
              ...d.execution,
              service: d.target.service,
              target_tick: d.target.target_tick,
            };
          });

          setExecutionLog(d as ExecutionType[]);
        })
        .catch((_err) => {});
    if (!exploits)
      fetch(`${CONFIG.MGMT_SERVER_URL}/api/exploits`)
        .then((res) => res.json())
        .then((data) => {
          setExploits(data as ExploitType[]);
        })
        .catch((_err) => {});
    return () => {
      newSocket.close();
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
  ]);

  useEffect(() => {
    if (!socket) return;
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
    socket.on('exploit', (data: ExploitType[]) => {
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
      socket.off('exploit');
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
