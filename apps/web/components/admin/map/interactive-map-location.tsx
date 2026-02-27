'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Map, { Layer, Marker, Source, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { useBoundary } from '@/hooks/use-boundary';
import { FloodMarker } from '@/components/markers/flood-marker';
import RadiusCircle from '@/components/shared/radius-circle';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import type { Feature, Polygon, MultiPolygon } from 'geojson';
import { toast } from 'sonner';
import { SafetyMarker } from '@/components/markers/safety-marker';
import { UserLocationMarker } from '@/components/markers/user-location-marker';

type Props = {
  severity?: 'low' | 'moderate' | 'high' | 'critical';
  range?: number;
  type?: 'shelter' | 'hospital';
  mode: 'flood-alert' | 'safety-location';
  onLocationSelect?: (location: {
    longitude: number;
    latitude: number;
  }) => void;
};

export type InteractiveMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  geolocate: () => void;
};

const InteractiveMapLocation = forwardRef<InteractiveMapHandle, Props>(
  ({ severity, range, type, mode, onLocationSelect }, ref) => {
    const mapRef = useRef<MapRef | null>(null);
    const { caloocanGeoJSON, caloocanOutlineGeoJSON } = useBoundary();
    const [location, setLocation] = useState<{
      longitude: number;
      latitude: number;
    } | null>(null);
    const [isOutside, setIsOutside] = useState(false);

    useImperativeHandle(ref, () => ({
      zoomIn: () => mapRef.current?.zoomIn(),
      zoomOut: () => mapRef.current?.zoomOut(),
      geolocate: () =>
        getUserLocation().then((pos) => {
          if (pos && mapRef.current) {
            const { longitude, latitude } = pos;

            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 16,
              essential: true,
            });

            if (caloocanGeoJSON) {
              const locatedPoint = point([longitude, latitude]);
              const features =
                caloocanGeoJSON.type === 'FeatureCollection'
                  ? caloocanGeoJSON.features
                  : [caloocanGeoJSON];

              const isInsideBoundary = features.some(
                (feature: Feature<Polygon | MultiPolygon>) =>
                  booleanPointInPolygon(locatedPoint, feature),
              );

              if (!isInsideBoundary) {
                toast.error(
                  'Your current location is outside of Caloocan boundaries.',
                );
                setIsOutside(true);
                setLocation({ longitude, latitude });
                return;
              }
              setIsOutside(false);
            }

            const newLocation = { longitude, latitude };
            setLocation(newLocation);
            onLocationSelect?.(newLocation);
          }
        }),
    }));

    const handleMapClick = (e: maplibregl.MapMouseEvent) => {
      if (!caloocanGeoJSON) return;

      const clickedPoint = point([e.lngLat.lng, e.lngLat.lat]);
      const features =
        caloocanGeoJSON.type === 'FeatureCollection'
          ? caloocanGeoJSON.features
          : [caloocanGeoJSON];

      const isInsideBoundary = features.some(
        (feature: Feature<Polygon | MultiPolygon>) =>
          booleanPointInPolygon(clickedPoint, feature),
      );

      if (!isInsideBoundary) {
        toast.error('Cannot pin location outside of Caloocan boundaries.');
        return;
      }

      const newLocation = {
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
      };

      setIsOutside(false);
      setLocation(newLocation);
      onLocationSelect?.(newLocation);
    };

    const handleMouseMove = (e: maplibregl.MapMouseEvent) => {
      if (!caloocanGeoJSON) return;

      const hoveredPoint = point([e.lngLat.lng, e.lngLat.lat]);
      const features =
        caloocanGeoJSON.type === 'FeatureCollection'
          ? caloocanGeoJSON.features
          : [caloocanGeoJSON];

      const isInsideBoundary = features.some(
        (feature: Feature<Polygon | MultiPolygon>) =>
          booleanPointInPolygon(hoveredPoint, feature),
      );

      e.target.getCanvas().style.cursor = isInsideBoundary ? 'pointer' : '';
    };

    const handleMouseLeave = (e: maplibregl.MapMouseEvent) => {
      e.target.getCanvas().style.cursor = '';
    };

    return (
      <Map
        id="interactive-map-location"
        ref={mapRef}
        initialViewState={{
          latitude: 14.69906,
          longitude: 120.99772,
          zoom: 11.5,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* boundary fill */}
        {caloocanGeoJSON && (
          <Source id="caloocan" type="geojson" data={caloocanGeoJSON}>
            <Layer
              id="caloocan-fill"
              type="fill"
              paint={{
                'fill-color': '#0066CC',
                'fill-opacity': 0.05,
              }}
            />
          </Source>
        )}

        {/* boundary outline */}
        {caloocanOutlineGeoJSON && (
          <Source
            id="caloocan-outline"
            type="geojson"
            data={caloocanOutlineGeoJSON}
          >
            <Layer
              id="caloocan-outline-line"
              type="line"
              paint={{
                'line-color': '#0066CC',
                'line-width': 2,
              }}
            />
          </Source>
        )}

        {/* user location marker */}
        {location && (
          <Marker
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
          >
            {isOutside ? (
              <UserLocationMarker />
            ) : mode === 'flood-alert' ? (
              <>
                <RadiusCircle
                  longitude={location.longitude}
                  latitude={location.latitude}
                  range={range}
                  severity={severity || 'low'}
                />
                <FloodMarker severity={severity || 'low'} />
              </>
            ) : mode === 'safety-location' ? (
              <SafetyMarker type={type || 'shelter'} />
            ) : null}
          </Marker>
        )}
      </Map>
    );
  },
);

InteractiveMapLocation.displayName = 'InteractiveMapLocation';

export default InteractiveMapLocation;
