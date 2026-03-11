// openclaw-generate.js
// OpenClaw 内容生成器 - 真正的"工作大脑"

const fs = require('fs');
const path = require('path');

console.log('🤖 OpenClaw 开始工作...');
console.log('📅 时间：' + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

// 1. 读取配置
try {
  const config = require('./openclaw-config.js');
  console.log(`📋 网站名称: ${config.site.name}`);
  console.log(`🌐 网站地址: ${config.site.url}`);
} catch (e) {
  console.log('⚠️ 没有找到配置文件，使用默认配置');
}

// 2. 定义要生成的工具数据（未来这里会变成从网上自动抓取）
const tools = [
  // 写作工具
  { name: 'ChatGPT', category: 'writing', description: '对话式AI，万能写作助手', url: 'https://chat.openai.com', rating: 4.9 },
  { name: 'Jasper', category: 'writing', description: 'AI营销文案撰写', url: 'https://www.jasper.ai', rating: 4.7 },
  { name: 'Copy.ai', category: 'writing', description: '快速生成营销文案', url: 'https://www.copy.ai', rating: 4.5 },
  
  // 图像工具
  { name: 'Midjourney', category: 'image', description: '通过文字生成惊艳图片', url: 'https://www.midjourney.com', rating: 4.8 },
  { name: 'DALL-E 3', category: 'image', description: 'OpenAI开发的图像生成模型', url: 'https://openai.com/dall-e-3', rating: 4.7 },
  { name: 'Stable Diffusion', category: 'image', description: '开源的AI图像生成器', url: 'https://stability.ai', rating: 4.6 },
  
  // 视频工具
  { name: 'Runway', category: 'video', description: 'AI视频编辑和生成', url: 'https://runwayml.com', rating: 4.6 },
  { name: 'Pika', category: 'video', description: '文字生成视频', url: 'https://pika.art', rating: 4.5 },
  { name: 'HeyGen', category: 'video', description: 'AI数字人生成', url: 'https://www.heygen.com', rating: 4.4 },
  
  // 营销工具
  { name: 'HubSpot AI', category: 'marketing', description: 'AI驱动的营销自动化', url: 'https://www.hubspot.com', rating: 4.5 },
  { name: 'SurferSEO', category: 'marketing', description: 'AI SEO优化工具', url: 'https://surferseo.com', rating: 4.6 },
  { name: 'Writer', category: 'marketing', description: '企业级AI写作平台', url: 'https://writer.com', rating: 4.4 }
];

// 3. 按分类整理工具
const categorized = tools.reduce((acc, tool) => {
  if (!acc[tool.category]) acc[tool.category] = [];
  acc[tool.category].push(tool);
  return acc;
}, {});

console.log(`📊 找到 ${tools.length} 个工具，分布在 ${Object.keys(categorized).length} 个分类`);

// 4. 为每个分类生成页面
let generatedCount = 0;
for (const [category, toolList] of Object.entries(categorized)) {
  // 定义文件路径：app/tools/[category]/page.tsx
  const filePath = path.join(__dirname, 'app', 'tools', category, 'page.tsx');
  
  // 确保目录存在（如果不存在就创建）
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 创建目录: app/tools/${category}`);
  }

  // 生成分类页面的完整内容
  const content = `// 由 OpenClaw 自动生成 - ${new Date().toISOString().split('T')[0]}
export default function ${category.charAt(0).toUpperCase() + category.slice(1)}Tools() {
  const tools = ${JSON.stringify(toolList, null, 2)};

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">最好的AI ${category === 'writing' ? '写作' : category === 'image' ? '图像' : category === 'video' ? '视频' : '营销'}工具</h1>
      <p className="text-xl text-gray-600 mb-8">
        发现并比较最流行的AI工具，提高您的工作效率。
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-500">⭐ {tool.rating}</span>
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                访问官网
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}`;

  // 写入文件
  fs.writeFileSync(filePath, content);
  console.log(`✅ 生成页面: app/tools/${category}/page.tsx (${toolList.length}个工具)`);
  generatedCount++;
}

console.log(`🎉 OpenClaw 工作完成！生成了 ${generatedCount} 个分类页面，共 ${tools.length} 个工具`);
console.log('🌐 访问你的网站查看效果：/tools/writing, /tools/image, /tools/video, /tools/marketing');
