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

import { useState, useEffect, useCallback } from 'react';

export function usePing() {
  const [pings, setPings] = useState<Record<string, number>>({});

  const initializeSocket = useCallback((location: string, host: string) => {
    // Set initial error state for this location
    setPings(prev => {
      console.log('Setting initial error state for', location, prev);
      return {
        ...prev,
        [location]: -1
      };
    });

    const ws = new WebSocket(`ws://${host}:5999`);
    let pingInterval: NodeJS.Timeout | null = null;
    
    const pingServer = () => {
      if (ws.readyState === WebSocket.OPEN) {
        const timestamp = Date.now().toString();
        console.log(`Sending ping to ${host}:`, timestamp);
        ws.send(timestamp);
      }
    };

    ws.onopen = () => {
      console.log(`Connected to ${host}`);
      // Start pinging immediately when connected
      pingServer();
      // Set up regular pinging
      pingInterval = setInterval(pingServer, 5000);
    };

    ws.onmessage = (event) => {
      try {
        console.log(`Received message from ${host}:`, event.data);
        // The sent timestamp should be in the message
        const sentTime = parseInt(event.data, 10);
        const now = Date.now();
        const pingTime = now - sentTime;
        
        console.log(`Calculated ping for ${host}:`, pingTime);
        
        setPings(prev => {
          const newPings = {
            ...prev,
            [location]: pingTime
          };
          console.log('Updated pings state:', newPings);
          return newPings;
        });
      } catch (error) {
        console.error(`Error processing ping for ${host}:`, error);
        setPings(prev => ({
          ...prev,
          [location]: -1
        }));
      }
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error for ${host}:`, error);
      setPings(prev => ({
        ...prev,
        [location]: -1
      }));
    };

    ws.onclose = (event) => {
      console.log(`Connection closed for ${host}, code: ${event.code}, reason: ${event.reason}`);
      if (pingInterval) {
        clearInterval(pingInterval);
      }
      // Attempt to reconnect after a short delay
      setTimeout(() => {
        console.log(`Attempting to reconnect to ${host}...`);
        initializeSocket(location, host);
      }, 5000);
    };

    return {
      socket: ws,
      cleanup: () => {
        if (pingInterval) {
          clearInterval(pingInterval);
        }
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log('Initializing WebSocket connections...');
    const connections = Object.entries(DATACENTER_LOCATIONS).map(([location, { host }]) => {
      return initializeSocket(location, host);
    });

    // Cleanup function
    return () => {
      console.log('Cleaning up WebSocket connections...');
      connections.forEach(({ cleanup }) => cleanup());
    };
  }, [initializeSocket]);

  return pings;
}
