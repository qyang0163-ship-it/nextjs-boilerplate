// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aitoolguide.tech'
  
  // 定义所有静态页面
  const pages = [
    { path: '', priority: 1.0, changeFreq: 'daily' },
    { path: '/about', priority: 0.8, changeFreq: 'weekly' },
    { path: '/submit', priority: 0.8, changeFreq: 'weekly' },
    { path: '/tools/writing', priority: 0.8, changeFreq: 'daily' },
    { path: '/tools/image', priority: 0.8, changeFreq: 'daily' },
    { path: '/tools/video', priority: 0.8, changeFreq: 'daily' },
    { path: '/tools/marketing', priority: 0.8, changeFreq: 'daily' },
  ]

  return pages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq as 'daily' | 'weekly',
    priority: page.priority,
  }))
}
