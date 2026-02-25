'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { IconSearch } from '@tabler/icons-react';

type NominatimResult = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type?: string;
};

export type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
  source?: 'nominatim' | 'custom';
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
}

export default function SearchBar({
  onSelectLocation,
}: {
  onSelectLocation?: (location: SelectedLocation) => void;
}) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const endpoint = useMemo(() => {
    return 'https://nominatim.openstreetmap.org/search';
  }, []);

  const debouncedQuery = useDebouncedValue(query.trim(), 250);

  const emitLocation = (result: NominatimResult) => {
    const lon = Number(result.lon);
    const lat = Number(result.lat);

    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return;

    onSelectLocation?.({
      longitude: lon,
      latitude: lat,
      label: result.display_name,
      source: 'nominatim',
    });
  };

  const runSearch = async () => {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    try {
      // If we already have suggestions, prefer the highlighted or first one.
      const pick = activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];

      if (pick) {
        emitLocation(pick);
        setOpen(false);
        return;
      }

      // Fallback: fetch a single result
      const url = `${endpoint}?format=json&q=${encodeURIComponent(q)}&limit=1&addressdetails=0`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Geocode failed: ${res.status}`);

      const data: NominatimResult[] = await res.json();
      if (!data[0]) return;

      emitLocation(data[0]);
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch suggestions as the user types
  useEffect(() => {
    const q = debouncedQuery;

    if (!q) {
      abortRef.current?.abort();
      setSuggestions([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchSuggestions = async () => {
      try {
        setLoading(true);

        const url =
          `${endpoint}?format=json` +
          `&q=${encodeURIComponent(q)}` +
          `&limit=6` +
          `&addressdetails=0` +
          `&polygon_geojson=0`;

        const res = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`Suggest failed: ${res.status}`);

        const data: NominatimResult[] = await res.json();

        const seen = new Set<number>();
        const cleaned = (data ?? []).filter((item) => {
          if (!item?.place_id) return false;
          if (seen.has(item.place_id)) return false;
          seen.add(item.place_id);
          return true;
        });

        setSuggestions(cleaned);
        setOpen(true);
        setActiveIndex(-1);
      } catch (err) {
        if ((err as any)?.name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [debouncedQuery, endpoint]);

  // Close on outside click
  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      if (!el.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col z-50 w-full h-fit pointer-events-auto"
    >
      <InputGroup className="h-12 rounded-xl bg-white shadow-md">
        <InputGroupInput
          placeholder="Search location..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
          onKeyDown={(event) => {
            if (!open && event.key === 'Enter') {
              runSearch();
              return;
            }

            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((prev) =>
                Math.min(prev + 1, suggestions.length - 1),
              );
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              setActiveIndex((prev) => Math.max(prev - 1, 0));
            } else if (event.key === 'Enter') {
              event.preventDefault();
              if (open && activeIndex >= 0 && suggestions[activeIndex]) {
                const chosen = suggestions[activeIndex];
                setQuery(chosen.display_name);
                emitLocation(chosen);
                setOpen(false);
              } else {
                runSearch();
              }
            } else if (event.key === 'Escape') {
              setOpen(false);
            }
          }}
        />

        <InputGroupAddon>
          <button
            type="button"
            onClick={runSearch}
            className="p-2"
            aria-label="Search"
            disabled={loading}
          >
            <IconSearch />
          </button>
        </InputGroupAddon>
      </InputGroup>

      {open && suggestions.length > 0 && (
        <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <ul className="max-h-72 overflow-auto py-1">
            {suggestions.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <li key={item.place_id}>
                  <button
                    type="button"
                    className={[
                      'w-full px-4 py-2 text-left text-sm',
                      active ? 'bg-slate-100' : 'hover:bg-slate-50',
                    ].join(' ')}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      setQuery(item.display_name);
                      emitLocation(item);
                      setOpen(false);
                    }}
                  >
                    <div className="line-clamp-2">{item.display_name}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
