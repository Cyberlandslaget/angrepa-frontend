import Navigation from 'components/Navigation';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  currentTickAtom,
  exploitLogAtom,
  exploitsAtom,
  scoreboardDataAtom,
  submissionLogAtom,
} from 'utils/atoms';
import { CONFIG } from 'utils/constants';
import { DataType, ExploitType, ScoreboardType } from 'utils/types';

export default function Layout({ children }: { children: ReactNode }) {
  const [scoreboardData, setScoreboardData] = useAtom(scoreboardDataAtom);
  const [submissionLog, setSubmissionLog] = useAtom(submissionLogAtom);
  const [exploitLog, setExploitLog] = useAtom(exploitLogAtom);
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
    if (!exploitLog)
      fetch(`${CONFIG.MGMT_SERVER_URL}/api/exploit_logs`)
        .then((res) => res.json())
        .then((data) => {
          setExploitLog(data as DataType[]);
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
    exploitLog,
    exploits,
    scoreboardData,
    setExploitLog,
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
        setExploitLog((ex) => {
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
    setExploitLog,
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
