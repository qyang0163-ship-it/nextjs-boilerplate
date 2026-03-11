// app/page.tsx
import Link from 'next/link';
import { getLatestTools } from '@/lib/getTools';

// 分类数据
const categories = [
  { id: 'writing', name: '写作工具', icon: '✍️', color: 'bg-blue-50 text-blue-600' },
  { id: 'image', name: '图像工具', icon: '🎨', color: 'bg-purple-50 text-purple-600' },
  { id: 'video', name: '视频工具', icon: '🎬', color: 'bg-green-50 text-green-600' },
  { id: 'marketing', name: '营销工具', icon: '📊', color: 'bg-orange-50 text-orange-600' },
];

export default function Home() {
  // 获取最新6个工具
  const latestTools = getLatestTools(6);

  return (
    <main className="min-h-screen">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">AI Tool Guide</h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            发现全球最好的AI工具，每日自动更新
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#latest" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              浏览最新工具
            </a>
            <Link 
              href="/tools/writing" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              查看所有工具
            </Link>
          </div>
        </div>
      </section>

      {/* 分类导航 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">按分类浏览</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.id}
                href={`/tools/${cat.id}`}
                className={`${cat.color} p-8 rounded-xl text-center hover:shadow-lg transition`}
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{cat.name}</h3>
                <p className="text-gray-600">查看所有工具</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 最新工具推荐 */}
      <section id="latest" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">最新AI工具</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            每日从ProductHunt自动抓取，第一时间发现创新产品
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTools.map((tool, index) => (
              <div key={index} className="border rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                  <span className="text-yellow-500 font-medium">⭐ {tool.rating}</span>
                </div>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags?.slice(0, 2).map((tag: string) => (   // 👈 关键修复：为 tag 添加类型注解
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{tag}</span>
                  ))}
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">🔥 {tool.votes || 0} 票</span>
                </div>
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/tools/${tool.category}`}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    查看同类工具 →
                  </Link>
                  <a 
                    href={tool.url}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                  >
                    访问官网
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/tools/writing" className="text-blue-500 hover:underline">
              查看更多工具 →
            </Link>
          </div>
        </div>
      </section>

      {/* 广告位 */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
            <p className="text-sm">广告位 - Google AdSense 自动展示</p>
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择AI Tool Guide？</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">每日更新</h3>
              <p className="text-gray-600">OpenClaw每天自动抓取最新AI工具，确保信息实时准确</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">真实数据</h3>
              <p className="text-gray-600">所有工具直接来自ProductHunt，有真实投票和用户评价</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">完全免费</h3>
              <p className="text-gray-600">为创作者提供免费的工具导航，靠广告维持运营</p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">AI Tool Guide</h4>
              <p className="text-gray-400 text-sm">发现全球最好的AI工具，提高工作效率</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/">首页</Link></li>
                <li><Link href="/tools/writing">写作工具</Link></li>
                <li><Link href="/tools/image">图像工具</Link></li>
                <li><Link href="/tools/video">视频工具</Link></li>
                <li><Link href="/tools/marketing">营销工具</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">更多</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about">关于我们</Link></li>
                <li><Link href="/submit">提交工具</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">关注我们</h4>
              <p className="text-gray-400 text-sm">社交媒体链接占位</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AI Tool Guide. 由 OpenClaw 自动驱动。</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
