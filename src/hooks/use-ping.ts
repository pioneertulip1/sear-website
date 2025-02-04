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

  const initializeSocket = useCallback((location: string, host: string) => {
    // Set initial error state for this location
    setPings(prev => ({ ...prev, [location]: -1 }));

    const ws = new WebSocket(`ws://${host}:5999`);
    wsConnections.current[location] = ws;

    ws.onopen = () => {
      console.log(`Connected to ${host}`);
      const timestamp = Date.now();
      ws.send(timestamp.toString());
    };

    ws.onmessage = (event => {
      try {
        const receivedTime = parseInt(event.data, 10);
        const pingTime = Date.now() - receivedTime;

        setPings(prev => ({ ...prev, [location]: pingTime }));
      } catch (error) {
        console.error(`Error processing ping for ${host}:`, error);
        setPings(prev => ({ ...prev, [location]: -1 }));
      }
    });

    ws.onerror = error => {
      console.error(`WebSocket error for ${host}:`, error);
      setPings(prev => ({ ...prev, [location]: -1 }));
    };

    ws.onclose = event => {
      console.log(`Connection closed for ${host}, code: ${event.code}, reason: ${event.reason}`);
      delete wsConnections.current[location];
      setPings(prev => ({ ...prev, [location]: -1 }));
      setTimeout(() => {
        console.log(`Attempting to reconnect to ${host}...`);
        initializeSocket(location, host);
      }, 5000);
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
