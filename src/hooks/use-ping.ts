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

import { useState, useEffect } from 'react';

export function usePing() {
  const [pings, setPings] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPings = async () => {
      try {
        const response = await fetch('/api/ping');
        if (!response.ok) throw new Error('Failed to fetch pings');
        const data = await response.json();
        setPings(data);
      } catch (error) {
        console.error('Error fetching pings:', error);
        // Set error state (-1) for all locations
        const errorPings = Object.keys(DATACENTER_LOCATIONS).reduce((acc, loc) => {
          acc[loc] = -1;
          return acc;
        }, {} as Record<string, number>);
        setPings(errorPings);
      }
    };

    fetchPings();

    const interval = setInterval(fetchPings, 5000);

    return () => clearInterval(interval);
  }, []);

  return pings;
}