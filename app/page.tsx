// app/page.tsx - 完整版主页
import Link from 'next/link';

// 热门工具数据
const popularTools = [
  {
    name: 'ChatGPT',
    category: 'writing',
    description: 'OpenAI开发的对话式AI助手，支持写作、编程、问答等',
    url: 'https://chat.openai.com',
    rating: 4.9,
    icon: '🤖'
  },
  {
    name: 'Midjourney',
    category: 'image',
    description: '通过文字描述生成高质量图片，艺术风格出色',
    url: 'https://www.midjourney.com',
    rating: 4.8,
    icon: '🎨'
  },
  {
    name: 'Runway ML',
    category: 'video',
    description: 'AI视频编辑和生成工具，支持绿幕抠像、视频合成',
    url: 'https://runwayml.com',
    rating: 4.7,
    icon: '🎬'
  },
  {
    name: 'Claude',
    category: 'writing',
    description: 'Anthropic开发的AI助手，支持超长上下文',
    url: 'https://claude.ai',
    rating: 4.8,
    icon: '🧠'
  },
  {
    name: 'DALL-E 3',
    category: 'image',
    description: 'OpenAI的图像生成模型，文字理解能力强',
    url: 'https://openai.com/dall-e-3',
    rating: 4.7,
    icon: '🖼️'
  },
  {
    name: 'Pika',
    category: 'video',
    description: '文字生成视频，简单易用',
    url: 'https://pika.art',
    rating: 4.5,
    icon: '⚡'
  }
];

// 分类数据
const categories = [
  { id: 'writing', name: '写作工具', icon: '✍️', count: 15, color: 'bg-blue-50 text-blue-600' },
  { id: 'image', name: '图像工具', icon: '🎨', count: 18, color: 'bg-purple-50 text-purple-600' },
  { id: 'video', name: '视频工具', icon: '🎬', count: 12, color: 'bg-green-50 text-green-600' },
  { id: 'marketing', name: '营销工具', icon: '📊', count: 10, color: 'bg-orange-50 text-orange-600' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 英雄区域（大标题） */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">AI Tool Guide</h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            发现全球最好的AI工具，提高您的工作效率
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#popular" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              浏览热门工具
            </a>
            <a 
              href="/tools/writing" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              查看所有工具
            </a>
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
                <p className="text-gray-600">{cat.count}个工具</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 热门工具推荐 */}
      <section id="popular" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">热门AI工具推荐</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            精选当下最受欢迎、评分最高的AI工具，助你快速找到适合的解决方案
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool, index) => (
              <div key={index} className="border rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tool.icon}</span>
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                  </div>
                  <span className="text-yellow-500 font-medium">⭐ {tool.rating}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{tool.description}</p>
                
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
        </div>
      </section>

      {/* 广告位（Google AdSense会自动填充） */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
            <p className="text-sm">广告位 - Google AdSense 自动展示</p>
            {/* Google AdSense 会自动在这里显示广告 */}
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
              <h3 className="text-xl font-semibold mb-2">人工筛选</h3>
              <p className="text-gray-600">所有工具都经过严格筛选，只推荐真正好用的产品</p>
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
                <li><a href="/" className="hover:text-white">首页</a></li>
                <li><a href="/tools/writing" className="hover:text-white">写作工具</a></li>
                <li><a href="/tools/image" className="hover:text-white">图像工具</a></li>
                <li><a href="/tools/video" className="hover:text-white">视频工具</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">热门工具</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://chat.openai.com" target="_blank" rel="nofollow">ChatGPT</a></li>
                <li><a href="https://www.midjourney.com" target="_blank" rel="nofollow">Midjourney</a></li>
                <li><a href="https://claude.ai" target="_blank" rel="nofollow">Claude</a></li>
                <li><a href="https://runwayml.com" target="_blank" rel="nofollow">Runway</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">关于我们</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">关于本站</a></li>
                <li><a href="#" className="hover:text-white">隐私政策</a></li>
                <li><a href="#" className="hover:text-white">联系我们</a></li>
                <li><a href="#" className="hover:text-white">提交工具</a></li>
              </ul>
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
