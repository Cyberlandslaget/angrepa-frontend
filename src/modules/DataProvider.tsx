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
import { WebSocketTable } from 'utils/enums';
import {
  ExecutionType,
  ExploitType,
  FlagType,
  WebSocketMessageType,
} from 'utils/types';
import useWebSocket from 'utils/useWebSocket';

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
  const setOnData = useWebSocket();
  const [hasInitializedFlags, setHasInitilizedFlags] = useState<boolean>(false);
  const [hasInitializedExecutions, setHasInitilizedExecutions] =
    useState<boolean>(false);
  const [hasInitializedExploits, setHasInitilizedExploits] =
    useState<boolean>(false);

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
    if (!hasInitializedExecutions)
      getExecutions(fourHoursAgo)
        .then((data) => data && updateExecutions(data))
        .catch((_e) => {});
    if (!hasInitializedFlags && executionLog)
      getFlags(fourHoursAgo)
        .then((data) => {
          if (data) {
            updateFlags(data);
            setHasInitilizedFlags(true);
          }
        })
        .catch((_e) => {});
    if (!hasInitializedExploits)
      getExploits()
        .then((data) => {
          if (data) {
            setExploits(data);
            setHasInitilizedExploits(true);
          }
        })
        .catch((_e) => {});
    if (!templates)
      getTemplateNames()
        .then((data) => {
          if (data) {
            setTemplates(data);
            setHasInitilizedExecutions(true);
          }
        })
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
    templates,
    setTemplates,
    updateExecutions,
    hasInitializedExecutions,
    hasInitializedFlags,
    hasInitializedExploits,
  ]);

  useEffect(() => {
    const func = () => (data: WebSocketMessageType) => {
      if (!data.data) return;
      switch (data.table) {
        case WebSocketTable.EXECUTION:
          updateExecutions([data.data as ExecutionType]);
          break;
        case WebSocketTable.FLAG:
          updateFlags([data.data as FlagType]);
          break;
        case WebSocketTable.EXPLOIT:
          updateExploits([data.data as ExploitType]);
          break;
      }
    };
    setOnData(func);
  }, [updateExecutions, updateFlags, updateExploits, setOnData]);

  return <>{children}</>;
}
