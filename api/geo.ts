/**
 * Returns the visitor's country code from Vercel's edge geolocation header.
 * Used only to pre-select pricing currency (INR for India, USD elsewhere).
 * No IP address or other data is stored or returned.
 */
export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ country: null });
  }

  const raw = req.headers?.['x-vercel-ip-country'];
  const value = Array.isArray(raw) ? raw[0] : raw;
  const country = typeof value === 'string' && /^[A-Za-z]{2}$/.test(value) ? value.toUpperCase() : null;

  // Per-visitor answer: never cache it at a shared layer.
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Vary', 'x-vercel-ip-country');
  return res.status(200).json({ country });
}
