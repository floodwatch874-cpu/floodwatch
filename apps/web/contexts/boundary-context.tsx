'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type BoundaryContextType = {
  caloocanGeoJSON: GeoJSON.FeatureCollection | null;
  caloocanOutlineGeoJSON: GeoJSON.FeatureCollection | null;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const [caloocanGeoJSON, setCaloocanGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [caloocanOutlineGeoJSON, setCaloocanOutlineGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch('/geo/caloocan.geojson', { signal: controller.signal }).then(
        (res) => res.json(),
      ),
      fetch('/geo/caloocan-outline.geojson', {
        signal: controller.signal,
      }).then((res) => res.json()),
    ])
      .then(([details, outline]) => {
        setCaloocanGeoJSON(details);
        setCaloocanOutlineGeoJSON(outline);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // ignore cleanup cancellations
        console.error('Failed to load Caloocan GeoJSON files', err);
      });

    return () => controller.abort();
  }, []);

  return (
    <BoundaryContext.Provider
      value={{ caloocanGeoJSON, caloocanOutlineGeoJSON }}
    >
      {children}
    </BoundaryContext.Provider>
  );
}

export function useBoundary() {
  const context = useContext(BoundaryContext);
  if (!context)
    throw new Error('useBoundary must be used within BoundaryContextProvider');
  return context;
}
