import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';
import { getAllPosts } from '../lib/posts';
import { getAllServices, serviceEncodedPath } from '../lib/services';
import { getAllDongs, dongEncodedPath } from '../lib/dongs';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/service/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/region/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/blog/`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
  ];
  for (const s of getAllServices()) {
    entries.push({ url: `${SITE_URL}${serviceEncodedPath(s)}`, lastModified: s.updatedAt ? new Date(s.updatedAt) : now, changeFrequency: 'monthly', priority: 0.9 });
  }
  for (const d of getAllDongs()) {
    entries.push({ url: `${SITE_URL}${dongEncodedPath(d)}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const p of getAllPosts()) {
    entries.push({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: p.updatedAt ? new Date(p.updatedAt) : now, changeFrequency: 'monthly', priority: 0.7 });
  }
  return entries;
}
