/** True while prerendering in Node at build time (no window/document). */
export const IS_SERVER = typeof window === 'undefined';
