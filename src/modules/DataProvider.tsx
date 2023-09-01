import getScoreboardData from 'api/informations/getScoreboardData';
import getTicks from 'api/informations/getTicks';
import getExecutions from 'api/logs/getExecutions';
import getExploits from 'api/logs/getExploits';
import getFlags from 'api/logs/getFlags';
import useUpdateExecutions from 'api/logs/useUpdateExecutions';
import useUpdateExploits from 'api/logs/useUpdateExploits';
import useUpdateFlags from 'api/logs/useUpdateFlags';
import { getTemplateNames } from 'api/templates/getTemplateData';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import {
  currentTickAtom,
  executionLogAtom,
  exploitsAtom,
  scoreboardDataAtom,
  flagLogAtom,
  templatesAtom,
} from 'utils/atoms';
import runWebSocket from 'utils/runWebSocket';
import { toUnixTimestamp } from 'utils/utils';

export default function DataProvider({ children }: { children: ReactNode }) {
  const [scoreboardData, setScoreboardData] = useAtom(scoreboardDataAtom);
  const [flagLog, setFlagLog] = useAtom(flagLogAtom);
  const [executionLog, setExecutionLog] = useAtom(executionLogAtom);
  const [exploits, setExploits] = useAtom(exploitsAtom);
  const [currentTick, setCurrentTick] = useAtom(currentTickAtom);
  const [templates, setTemplates] = useAtom(templatesAtom);
  const updateExecutions = useUpdateExecutions();
  const updateFlags = useUpdateFlags();
  const updateExploits = useUpdateExploits();

  useEffect(() => {
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
    if (!templates)
      getTemplateNames()
        .then((data) => setTemplates(data))
        .catch((_e) => {}); 
    
    runWebSocket((data) => {
      updateExecutions(data.executions);
      updateFlags(data.flags);
      updateExploits(data.exploits);
    })

    /*
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
    */
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
    templates,
    setTemplates,
    updateExecutions
  ]);

  return <>{children}</>;
}