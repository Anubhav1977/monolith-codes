import { useSyncExternalStore } from 'react';

/**
 * Visitor currency, auto-detected — no selection required.
 *
 * 1. Instant guess from the browser time zone (Asia/Kolkata → INR), so the
 *    first paint already shows the right currency without a flash.
 * 2. Refined once per session by `/api/geo` (Vercel's IP country header).
 * 3. An explicit switch by the visitor (VPN / travelling) wins and persists.
 */
export type Currency = 'INR' | 'USD';

const OVERRIDE_KEY = 'mc-currency';
const GEO_KEY = 'mc-geo-country';

const safeGet = (store: 'local' | 'session', key: string) => {
  try {
    return (store === 'local' ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (store: 'local' | 'session', key: string, value: string) => {
  try {
    (store === 'local' ? localStorage : sessionStorage).setItem(key, value);
  } catch {
    /* storage unavailable — detection still works for this page view */
  }
};

const fromCountry = (country: string | null): Currency | null =>
  country ? (country.toUpperCase() === 'IN' ? 'INR' : 'USD') : null;

function guessFromTimeZone(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' ? 'INR' : 'USD';
  } catch {
    return 'USD';
  }
}

const isCurrency = (v: string | null): v is Currency => v === 'INR' || v === 'USD';

let current: Currency | null = null;
let geoRequested = false;
const listeners = new Set<() => void>();

function initial(): Currency {
  const override = safeGet('local', OVERRIDE_KEY);
  if (isCurrency(override)) return override;
  return fromCountry(safeGet('session', GEO_KEY)) ?? guessFromTimeZone();
}

function emit(next: Currency) {
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

function requestGeo() {
  if (geoRequested || typeof fetch === 'undefined') return;
  geoRequested = true;
  if (safeGet('session', GEO_KEY) || isCurrency(safeGet('local', OVERRIDE_KEY))) return;
  fetch('/api/geo', { headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((data: { country?: string | null } | null) => {
      const country = typeof data?.country === 'string' ? data.country : null;
      if (!country) return; // local dev / unknown → keep the time-zone guess
      safeSet('session', GEO_KEY, country);
      if (!isCurrency(safeGet('local', OVERRIDE_KEY))) {
        const next = fromCountry(country);
        if (next) emit(next);
      }
    })
    .catch(() => {
      /* offline or API missing — the time-zone guess stands */
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  requestGeo();
  return () => listeners.delete(listener);
}

function getSnapshot(): Currency {
  if (current === null) current = initial();
  return current;
}

/** Explicit visitor choice; persists across visits. */
export function setCurrency(next: Currency) {
  safeSet('local', OVERRIDE_KEY, next);
  emit(next);
}

export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'USD');
}
