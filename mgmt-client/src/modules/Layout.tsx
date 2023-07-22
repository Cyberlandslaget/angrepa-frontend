import Navigation from 'components/Navigation';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useReducer, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  // currentTickAtom,
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
  // const [_, setCurrentTick] = useAtom(currentTickAtom);

  useEffect(() => {
    const newSocket = io(
      `${
        import.meta.env.DEV ? 'http://localhost:5000' : CONFIG.MGMT_SERVER_URL
      }`
    );
    setSocket(newSocket);
    if (!scoreboardData)
      fetch(
        `${
          import.meta.env.DEV ? 'http://localhost:5000' : CONFIG.MGMT_SERVER_URL
        }/api/scoreboard`
      )
        .then((res) => res.json())
        .then((data) => {
          setScoreboardData(data);
        });
    if (!submissionLog)
      fetch(
        `${
          import.meta.env.DEV ? 'http://localhost:5000' : CONFIG.MGMT_SERVER_URL
        }/api/flag`
      )
        .then((res) => res.json())
        .then((data) => {
          setSubmissionLog(data);
        });
    if (!exploitLog)
      fetch(
        `${
          import.meta.env.DEV ? 'http://localhost:5000' : CONFIG.MGMT_SERVER_URL
        }/api/exploit_logs`
      )
        .then((res) => res.json())
        .then((data) => {
          setExploitLog(data);
        });
    if (!exploits)
      fetch(
        `${
          import.meta.env.DEV ? 'http://localhost:5000' : CONFIG.MGMT_SERVER_URL
        }/api/exploits`
      )
        .then((res) => res.json())
        .then((data) => {
          setExploits(data);
        });
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('scoreboard', (data: ScoreboardType) => {
      if (data?.teams) setScoreboardData(data);
      // if (Number(data?.currentTick)) setCurrentTick(Number(data.currentTick));
    });
    socket.on('submission', (data: DataType[]) => {
      console.log('got flag!', data);
      if (data?.length > 0) {
        console.log('yuh', data.length);
        setSubmissionLog((sub) => {
          const newData = data.filter((d) => !sub?.find((s) => s.id === d.id));
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

    return () => {
      socket.off('scoreboard');
      socket.off('submission');
      socket.off('exploit');
      socket.off('exploits');
    };
  }, [socket, setScoreboardData, setSubmissionLog, setExploitLog, setExploits]);

  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
      <Navigation />
      {children}
    </main>
  );
}
