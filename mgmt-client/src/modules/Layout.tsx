import Navigation from 'components/Navigation';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  currentTickAtom,
  executionsLogAtom,
  exploitsAtom,
  scoreboardDataAtom,
  submissionLogAtom,
} from 'utils/atoms';
import { CONFIG } from 'utils/constants';
import {
  DataType,
  ExecutionType,
  ExploitType,
  ScoreboardType,
} from 'utils/types';

export default function Layout({ children }: { children: ReactNode }) {
  const [scoreboardData, setScoreboardData] = useAtom(scoreboardDataAtom);
  const [submissionLog, setSubmissionLog] = useAtom(submissionLogAtom);
  const [executionsLog, setExecutionsLog] = useAtom(executionsLogAtom);
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
    if (!submissionLog)
      fetch(`${CONFIG.MGMT_SERVER_URL}/api/flag`)
        .then((res) => res.json())
        .then((data) => {
          setSubmissionLog(data as DataType[]);
        })
        .catch((_err) => {});
    if (!executionsLog)
      fetch(`${CONFIG.MGMT_SERVER_URL}/logs/executions`)
        .then((res) => res.json())
        .then((data: { status: 'ok' | 'error'; data: ExecutionType[] }) => {
          console.log(data.data);
          setExecutionsLog(data.data);
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
    executionsLog,
    exploits,
    scoreboardData,
    setExecutionsLog,
    setExploits,
    setScoreboardData,
    setSubmissionLog,
    submissionLog,
  ]);

  useEffect(() => {
    if (!socket) return;
    socket.on('scoreboard', (data: ScoreboardType) => {
      if (data?.teams) setScoreboardData(data);
      // if (Number(data?.currentTick)) setCurrentTick(Number(data.currentTick));
    });
    socket.on('submission', (data: DataType[]) => {
      if (data?.length > 0) {
        setSubmissionLog((sub) => {
          const newData = data.filter(
            (d) => !sub?.find((s) => s.flag === d.flag)
          );
          return [...(sub ?? []), ...newData];
        });
      }
    });
    socket.on('exploit', (data: DataType[]) => {
      if (data?.length > 0)
        setExecutionsLog((ex) => {
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
      socket.off('submission');
      socket.off('exploit');
      socket.off('exploits');
      socket.off('tick');
    };
  }, [
    socket,
    setScoreboardData,
    setSubmissionLog,
    setExecutionsLog,
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
