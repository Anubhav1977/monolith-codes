/**
 * Notify IndexNow (Bing, Yandex, Seznam, Naver …) about every URL in the live sitemap.
 * Run AFTER a production deploy:  npm run indexnow
 * The key file is public/1fc61e64e5f97ce7d44617ef492ac278.txt (must stay deployed at the site root).
 */
const HOST = 'monolithcodes.com';
const KEY = '1fc61e64e5f97ce7d44617ef492ac278';

const res = await fetch(`https://${HOST}/sitemap.xml`);
if (!res.ok) throw new Error(`Could not fetch sitemap: ${res.status}`);
const xml = await res.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !u.endsWith('.jpg'));

const ping = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${ping.status}`);
if (ping.status >= 400) process.exit(1);
