'use client';

import { useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { DATACENTER_LOCATIONS, usePing } from '@/hooks/use-ping';

export function MapSection() {
  const pings = usePing();
  
  const geoUrl = "https://unpkg.com/world-atlas/countries-50m.json";

  const markers = useMemo(() => 
    Object.entries(DATACENTER_LOCATIONS).map(([key, location]) => ({
      ...location,
      id: key,
      ping: pings[key] ?? -1,
    }))
  , [pings]);

  return (
    <section className="relative py-16 bg-background">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">
          Global Infrastructure
        </h2>
        
        <div className="max-w-3xl mx-auto aspect-[2/1] bg-background rounded-lg border">
          <ComposableMap
            projectionConfig={{
              scale: 240,
              center: [20, 0]
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#2C2C2C"
                    stroke="#666"
                    strokeWidth={0.5}
                  />
                ))
              }
            </Geographies>

            {markers.map(({ name, coordinates, ping }) => (
              <Marker key={name} coordinates={coordinates as [number, number]}>
                <g>
                  {/* Ping circle animation */}
                  <circle
                    r="8"
                    fill="none"
                    stroke={ping === -1 ? "rgba(239, 68, 68, 0.5)" : "rgba(147, 51, 234, 0.5)"} // red for error, purple for normal
                    strokeWidth="2"
                    className="animate-ping"
                  />
                  {/* Main marker dot */}
                  <circle
                    r="4"
                    fill={ping === -1 ? "#EF4444" : "#9333EA"} // red for error, purple for normal
                  />
                </g>
                {/* Location name */}
                <text
                  textAnchor="middle"
                  y={-15}
                  className="fill-current text-sm font-semibold"
                >
                  {name}
                </text>
                {/* Ping label */}
                <text
                  textAnchor="middle"
                  y={20}
                  className="fill-current text-sm"
                >
                  {ping === -1 ? "Error" : `${ping}ms`}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </section>
  );
}