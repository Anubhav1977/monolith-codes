/**
 * Notify IndexNow (Bing, Yandex, Seznam, Naver …) about every URL in the live sitemap(s).
 * Run AFTER a production deploy:  npm run seo:indexnow
 * The key file is public/1fc61e64e5f97ce7d44617ef492ac278.txt (must stay deployed at the site root).
 */
const HOST = 'monolithcodes.com';
const KEY = '1fc61e64e5f97ce7d44617ef492ac278';

const fetchXml = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not fetch ${url}: ${res.status}`);
  return res.text();
};
const locs = (xml, tag) => [...xml.matchAll(new RegExp(`<${tag}>\\s*<loc>([^<]+)</loc>`, 'g'))].map((m) => m[1]);

const root = await fetchXml(`https://${HOST}/sitemap.xml`);
const children = locs(root, 'sitemap');
const urlList = children.length
  ? (await Promise.all(children.map(fetchXml))).flatMap((xml) => locs(xml, 'url'))
  : locs(root, 'url');

const ping = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${ping.status}`);
if (ping.status >= 400) process.exit(1);
