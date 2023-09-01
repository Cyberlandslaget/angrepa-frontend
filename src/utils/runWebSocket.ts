import { CONFIG } from "./constants";
import { WebSocketMessageType } from "./types";

export default function runWebSocket (onData: (data: WebSocketMessageType) => void) {
var ws = new WebSocket(`ws://${CONFIG.MGMT_SERVER_URL}:8001`);

  ws.onmessage = function(e) {
    onData(JSON.parse(e.data));
  };

  ws.onclose = function(e) {
    setTimeout(function() {
      runWebSocket(onData);
    }, 1000);
  };

  ws.onerror = function(err) {
    ws.close();
  };
}