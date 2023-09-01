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
      ws.onmessage = (res) => {
        onData && onData(JSON.parse(String(res.data)) as WebSocketMessageType);
      };
  }, [ws, onData]);

  useEffect(() => {
    if (ws) {
      ws.onclose = (_res) => {
        setTimeout(function () {
          setWs(
            new WebSocket(`ws://${CONFIG.MGMT_SERVER_URL.split(':')[1]}:8001`)
          );
        }, 1000);
      };

      ws.onerror = (_err) => {
        ws.close();
      };
    } else {
      setWs(new WebSocket(`ws://${CONFIG.MGMT_SERVER_URL.split(':')[1]}:8001`));
    }
  }, [ws]);
  return setOnData;
}
