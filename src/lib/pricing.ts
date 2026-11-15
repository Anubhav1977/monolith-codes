import type { Currency } from '@/lib/currency';

/**
 * Starting prices per tier. `null` = quoted per project.
 * INR set by the studio; USD set at international market rates for the same scope.
 */
export const STARTING_PRICES: Record<'launch' | 'grow' | 'build', Record<Currency, string> | null> = {
  launch: { INR: '₹12,999', USD: '$999' },
  grow: { INR: '₹29,999', USD: '$2,499' },
  build: null,
};

/** USD starting prices as numbers (structured data). Keep in sync with STARTING_PRICES. */
export const STARTING_PRICES_USD: Record<'launch' | 'grow' | 'build', number | null> = {
  launch: 999,
  grow: 2499,
  build: null,
};
