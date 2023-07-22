import Navigation from 'components/Navigation';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  currentTickAtom,
  exploitLogAtom,
  scoreboardDataAtom,
  submissionLogAtom,
} from 'utils/atoms';
import { DataType, ScoreboardType } from 'utils/types';

export default function Layout({ children }: { children: ReactNode }) {
  const [scoreboardData, setScoreboardData] = useAtom(scoreboardDataAtom);
  const [submissionLog, setSubmissionLog] = useAtom(submissionLogAtom);
  const [exploitLog, setExploitLog] = useAtom(exploitLogAtom);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [_, setCurrentTick] = useAtom(currentTickAtom);

  useEffect(() => {
    const newSocket = io(
      `${
        import.meta.env.DEV
          ? 'http://172.17.82.30:5000'
          : String(import.meta.env.VITE_MGTM_SERVER_URL) ||
            'http://localhost:3000'
      }`
    );
    setSocket(newSocket);
    if (!scoreboardData)
      fetch(
        `${
          import.meta.env.DEV
            ? 'http://172.17.82.30:5000'
            : String(import.meta.env.VITE_MGTM_SERVER_URL) ||
              'http://localhost:3000'
        }/api/scoreboard`
      )
        .then((res) => res.json())
        .then((data) => {
          setScoreboardData(data);
        });
    if (!submissionLog)
      fetch(
        `${
          import.meta.env.DEV
            ? 'http://172.17.82.30:5000'
            : String(import.meta.env.VITE_MGTM_SERVER_URL) ||
              'http://localhost:3000'
        }/api/flag`
      )
        .then((res) => res.json())
        .then((data) => {
          setSubmissionLog(data);
        });
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('scoreboard', (data: ScoreboardType) => {
      if (data?.teams) setScoreboardData(data);
      if (Number(data?.currentTick)) setCurrentTick(Number(data.currentTick));
    });
    socket.on('submission', (data: DataType[]) => {
      if (data?.length > 0)
        setSubmissionLog((sub) => {
          const newData = data.filter((d) => !sub?.find((s) => s.id === d.id));
          return [...(sub ?? []), ...newData];
        });
    });
    socket.on('exploit', (data: DataType[]) => {
      if (data?.length > 0)
        setExploitLog((ex) => {
          const newData = data.filter((d) => !ex.find((e) => e.id === d.id));
          return [...ex, ...newData];
        });
    });

    return () => {
      socket.off('scoreboard');
      socket.off('submission');
      socket.off('exploit');
    };
  }, [
    socket,
    setScoreboardData,
    setSubmissionLog,
    setExploitLog,
    setCurrentTick,
  ]);

  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
      <Navigation />
      {children}
    </main>
  );
}
