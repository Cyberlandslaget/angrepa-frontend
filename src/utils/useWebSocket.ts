import { useEffect, useState } from 'react';
import { CONFIG } from './constants';
import { WebSocketMessageType } from './types';
import { wsAtom } from './atoms';
import { useAtom } from 'jotai';

export default function useWebSocket() {
  const [onData, setOnData] = useState<
    ((data: WebSocketMessageType) => void) | null
  >(null);
  const [ws, setWs] = useAtom(wsAtom);

  useEffect(() => {
    if (ws)
      ws.onmessage = function (e) {
        onData && onData(JSON.parse(e.data));
      };
  }, [ws, onData]);

  useEffect(() => {
    if (ws) {
      ws.onclose = function (e) {
        setTimeout(function () {
          setWs(
            new WebSocket(`ws://${CONFIG.MGMT_SERVER_URL.split(':')[1]}:8001`)
          );
        }, 1000);
      };

      ws.onerror = function (err) {
        ws.close();
      };
    } else {
      setWs(new WebSocket(`ws://${CONFIG.MGMT_SERVER_URL.split(':')[1]}:8001`));
    }
  }, [ws]);
  return setOnData;
}
