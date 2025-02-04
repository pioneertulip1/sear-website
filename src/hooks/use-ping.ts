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

  // Moved processMessage inside usePing with added location param
  const processMessage = (message: string, host: string, location: string) => {
    console.log(`Received raw message from ${host}:`, message);
    try {
      const receivedTime = parseInt(message, 10);
      if (isNaN(receivedTime)) {
        throw new Error(`Invalid timestamp received: ${message}`);
      }
      console.log(`Parsed time from ${host}:`, receivedTime);
      const pingTime = Date.now() - receivedTime;
      console.log(`Calculated ping for ${host}:`, pingTime);
      setPings(prev => ({ ...prev, [location]: pingTime }));
    } catch (error) {
      console.error(`Error processing ping for ${host}:`, error);
      console.error(`Failed to parse message:`, message);
      setPings(prev => ({ ...prev, [location]: -1 }));
    }
  };

  const initializeSocket = useCallback((location: string, host: string) => {
    // Set initial error state for this location
    setPings(prev => ({ ...prev, [location]: -1 }));

    console.log(`Initializing WebSocket connection to ${host}...`);
    // Check if browser supports WebSocket
    if (!window.WebSocket) {
      console.error('WebSocket not supported by browser');
      setPings(prev => ({ ...prev, [location]: -1 }));
      return;
    }

    let pingInterval: number; // Added to hold setInterval ID

    const ws = new WebSocket(`wss://${host}:5999`);
    wsConnections.current[location] = ws;

    // Log any security errors
    window.addEventListener('error', (e) => {
      if (e.message.includes('SecurityError') || e.message.includes('CORS')) {
        console.error(`Security error for ${host}:`, e.message);
      }
    });

    ws.onopen = () => {
      console.log(`Connected to ${host}`);
      console.log(`WebSocket state after open: ${ws.readyState}`);
      const timestamp = Date.now();
      const message = timestamp.toString();
      console.log(`Sending to ${host}:`, message);
      try {
        ws.send(message);
        console.log(`Successfully sent timestamp to ${host}: ${timestamp}`);
      } catch (error) {
        console.error(`Failed to send message to ${host}:`, error);
      }
      // Start interval to send ping every 5000 ms
      pingInterval = window.setInterval(() => {
        const newTimestamp = Date.now();
        try {
          ws.send(newTimestamp.toString());
          console.log(`Sent periodic ping to ${host}: ${newTimestamp}`);
        } catch (error) {
          console.error(`Failed sending periodic ping to ${host}:`, error);
        }
      }, 5000);
    };

    ws.onmessage = event => {
      if (event.data instanceof Blob) {
        event.data.text().then((textData) => {
          processMessage(textData, host, location);
        }).catch(error => {
          console.error(`Error reading Blob from ${host}:`, error);
          setPings(prev => ({ ...prev, [location]: -1 }));
        });
      } else {
        processMessage(event.data, host, location);
      }
    };

    ws.onerror = error => {
      console.error(`WebSocket onerror event:`, error);
      console.error(`WebSocket error for ${host}:`, error);
      setPings(prev => ({ ...prev, [location]: -1 }));
    };

    ws.onclose = event => {
      // Clear the ping interval on socket close
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
      
      // Changed line: cast event.code to keyof typeof codes.
      const details = codes[event.code as keyof typeof codes] || "Unknown reason";
      console.log(`Connection closed for ${host}:`);
      console.log(`- Code: ${event.code} (${details})`);
      console.log(`- Reason: ${event.reason || 'No reason provided'}`);
      console.log(`- Clean close: ${event.wasClean}`);
      
      delete wsConnections.current[location];
      setPings(prev => ({ ...prev, [location]: -1 }));
      
      // Only reconnect on abnormal closures
      if (event.code === 1006 || !event.wasClean) {
        setTimeout(() => {
          console.log(`Attempting to reconnect to ${host}...`);
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
