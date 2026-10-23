import fs from 'node:fs';
import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';
import { getAllPosts } from '../lib/posts';
import { getAllServices, serviceEncodedPath } from '../lib/services';
import { getAllDongs, dongEncodedPath } from '../lib/dongs';

// lastmod는 실제 내용이 바뀐 시각만 쓴다. 빌드 시각(new Date())을 박으면 매 빌드마다 전 URL이
// "수정됨"이 되어 검색엔진이 lastmod 신호를 무시한다.
const mtime = (...files: string[]) => new Date(Math.max(...files.map((f) => fs.statSync(f).mtimeMs)));
const latest = (dates: (string | Date | undefined)[]) =>
  new Date(Math.max(...dates.filter(Boolean).map((d) => new Date(d as string).getTime())));

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const posts = getAllPosts();
  const postsUpdated = latest(posts.map((p) => p.updatedAt || p.date));
  const servicesUpdated = latest(services.map((s) => s.updatedAt));
  const dongsUpdated = mtime(
    'lib/dongs.ts',
    'data/seoul-dongs.json',
    'data/gg-dongs.json',
    'data/city-dongs.json',
    'data/expansion-dongs.json',
  );

  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: postsUpdated, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/service/`, lastModified: servicesUpdated, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/region/`, lastModified: dongsUpdated, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/blog/`, lastModified: postsUpdated, changeFrequency: 'daily', priority: 0.8 },
  ];
  for (const s of services) {
    entries.push({ url: `${SITE_URL}${serviceEncodedPath(s)}`, lastModified: new Date(s.updatedAt), changeFrequency: 'monthly', priority: 0.9 });
  }
  for (const d of getAllDongs()) {
    entries.push({ url: `${SITE_URL}${dongEncodedPath(d)}`, lastModified: dongsUpdated, changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const p of posts) {
    entries.push({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: new Date(p.updatedAt || p.date), changeFrequency: 'monthly', priority: 0.7 });
  }
  return entries;
}
