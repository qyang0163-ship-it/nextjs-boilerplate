// app/about/page.tsx
import Link from 'next/link';

export const metadata = {
  title: '关于我们 - AI Tool Guide',
  description: '了解AI Tool Guide的使命和背后的OpenClaw技术',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">关于我们</h1>
      
      <div className="prose prose-lg">
        <p className="text-xl text-gray-600 mb-8">
          AI Tool Guide 是一个自动更新的AI工具导航网站，致力于帮助创作者和开发者发现最新、最实用的AI工具。
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">我们的使命</h2>
        <p>
          每天有成百上千的新AI工具诞生，但很少有人能及时了解它们。我们使用 OpenClaw 自动抓取 ProductHunt 等平台的最新工具，为你筛选出最有价值的AI产品。
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">关于 OpenClaw</h2>
        <p>
          OpenClaw 是一个开源的内容自动化引擎，它可以自动从互联网抓取信息、生成页面并发布。本项目完全由 OpenClaw 驱动，实现全自动更新。
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">联系我们</h2>
        <p>
          如果你有任何问题或建议，欢迎通过以下方式联系我们：
        </p>
        <ul className="list-disc pl-6">
          <li>提交工具：<Link href="/submit" className="text-blue-500">点击这里</Link></li>
          <li>GitHub：<a href="#" className="text-blue-500">项目地址</a>（可放你的仓库）</li>
          <li>邮箱：<a href="mailto:contact@aitoolguide.tech" className="text-blue-500">contact@aitoolguide.tech</a></li>
        </ul>
      </div>
    </main>
  );
}
