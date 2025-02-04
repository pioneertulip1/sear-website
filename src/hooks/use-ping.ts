export const DATACENTER_LOCATIONS = {
  singapore: {
    name: 'Singapore',
    coordinates: [103.8198, 1.3521],
    host: 'node5.sear.host'
  },
  hyderabad: {
    name: 'Hyderabad',
    coordinates: [78.4867, 17.3850],
    host: 'node1.sear.host'
  },
  pennsylvania: {
    name: 'Pennsylvania',
    coordinates: [-77.1945, 41.2033],
    host: 'node6.sear.host'
  },
};

import { useState, useEffect, useCallback, useRef } from 'react';

export function usePing() {
  const [pings, setPings] = useState<Record<string, number>>({});
  const wsConnections = useRef<Record<string, WebSocket>>({});

  const processMessage = (message: string, host: string, location: string) => {
    try {
      const receivedTime = parseInt(message, 10);
      if (isNaN(receivedTime)) {
        throw new Error(`Invalid timestamp received: ${message}`);
      }
      const pingTime = Date.now() - receivedTime;
      setPings(prev => ({ ...prev, [location]: pingTime }));
    } catch (error) {
      setPings(prev => ({ ...prev, [location]: -1 }));
    }
  };

  const initializeSocket = useCallback((location: string, host: string) => {
    setPings(prev => ({ ...prev, [location]: -1 }));

    if (!window.WebSocket) {
      setPings(prev => ({ ...prev, [location]: -1 }));
      return;
    }

    let pingInterval: number;

    const ws = new WebSocket(`wss://${host}`);
    wsConnections.current[location] = ws;

    window.addEventListener('error', (e) => {
      if (e.message.includes('SecurityError') || e.message.includes('CORS')) {
      }
    });

    ws.onopen = () => {
      const timestamp = Date.now();
      const message = timestamp.toString();
      try {
        ws.send(message);
      } catch (error) {
      }
      pingInterval = window.setInterval(() => {
        const newTimestamp = Date.now();
        try {
          ws.send(newTimestamp.toString());
        } catch (error) {
        }
      }, 5000);
    };

    ws.onmessage = event => {
      if (event.data instanceof Blob) {
        event.data.text().then((textData) => {
          processMessage(textData, host, location);
        }).catch(error => {
          setPings(prev => ({ ...prev, [location]: -1 }));
        });
      } else {
        processMessage(event.data, host, location);
      }
    };

    ws.onerror = error => {
      setPings(prev => ({ ...prev, [location]: -1 }));
    };

    ws.onclose = event => {
      clearInterval(pingInterval);
      const codes = {
        1000: "Normal closure",
        1001: "Going away",
        1002: "Protocol error",
        1003: "Unsupported data",
        1005: "No status received",
        1006: "Abnormal closure",
        1007: "Invalid frame payload data",
        1008: "Policy violation",
        1009: "Message too big",
        1010: "Missing extension",
        1011: "Internal error",
        1012: "Service restart",
        1013: "Try again later",
        1015: "TLS handshake failure"
      };
      
      const details = codes[event.code as keyof typeof codes] || "Unknown reason";
      
      delete wsConnections.current[location];
      setPings(prev => ({ ...prev, [location]: -1 }));
      
      if (event.code === 1006 || !event.wasClean) {
        setTimeout(() => {
          initializeSocket(location, host);
        }, 5000);
      }
    };

    return {
      socket: ws,
      cleanup: () => {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    Object.entries(DATACENTER_LOCATIONS).forEach(([location, { host }]) => {
      initializeSocket(location, host);
    });

    return () => {
      Object.values(wsConnections.current).forEach(ws => {
        ws.close();
      });
      wsConnections.current = {};
    };
  }, [initializeSocket]);

  return pings;
}
