import { useEffect } from "react";

const useCallEvents = (token: string, onCallCancelled: (data: any) => void) => {
  useEffect(() => {
    if(!token) return;
    const ws = new WebSocket(
      `wss://rsv01.oncall.vn:8887/ws?token=${token}`
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event_type === "call_cancelled") {
        console.log("Call cancelled:", data);
        onCallCancelled(data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [token, onCallCancelled]);
};

export default useCallEvents;
