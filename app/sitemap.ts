// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aitoolguide.tech'
  
  // 基础页面
  const pages = [
    '',
    '/tools/writing',
    '/tools/image', 
    '/tools/video',
    '/tools/marketing',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  return pages
}
