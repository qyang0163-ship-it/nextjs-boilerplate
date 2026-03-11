// openclaw-generate.js - 真实ProductHunt API版
// 自动从ProductHunt抓取最新AI工具并生成页面

const fs = require('fs');
const path = require('path');
const https = require('https');

// ===== 配置区域（已填入你的API凭证）=====
const CONFIG = {
  producthunt: {
    clientId: 'qYW-75Plv75Kz8vymSr3qKES6XFOsjuuItSoVYsWLqM',     // 你的Client ID
    clientSecret: 'X0-6dV4L7Z-sY4hlDO_edhZXi--6SZJMTqe3H_Ca4JQ' // 你的Client Secret
  },
  // ProductHunt分类 → 你的网站分类映射
  categories: {
    'tech': 'writing',
    'artificial-intelligence': 'writing',
    'developer-tools': 'writing',
    'design-tools': 'image',
    'image-editing': 'image',
    'video': 'video',
    'video-editing': 'video',
    'marketing': 'marketing',
    'seo': 'marketing',
    'sales': 'marketing'
  },
  defaultCategory: 'writing',
  limit: 20 // 每次抓取数量
};

console.log('🤖 OpenClaw 真实API版开始工作...');
console.log('📅 时间：' + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

// ===== HTTP请求工具 =====
function httpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

// ===== 获取ProductHunt访问令牌 =====
async function getProductHuntToken() {
  console.log('🔑 正在获取ProductHunt访问令牌...');
  
  const options = {
    hostname: 'api.producthunt.com',
    path: '/v2/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  
  const data = JSON.stringify({
    client_id: CONFIG.producthunt.clientId,
    client_secret: CONFIG.producthunt.clientSecret,
    grant_type: 'client_credentials'
  });
  
  try {
    const response = await httpRequest(options, data);
    if (response.access_token) {
      console.log('✅ 获取令牌成功');
      return response.access_token;
    } else {
      throw new Error('获取令牌失败：' + JSON.stringify(response));
    }
  } catch (error) {
    console.error('❌ 获取令牌失败：', error.message);
    return null;
  }
}

// ===== 从ProductHunt抓取最新产品 =====
async function fetchFromProductHunt(token) {
  console.log('🌐 正在从ProductHunt抓取最新产品...');
  
  const query = `
    query {
      posts(first: ${CONFIG.limit}, order: NEWEST) {
        edges {
          node {
            id
            name
            tagline
            description
            url
            website
            votesCount
            createdAt
            thumbnail {
              url
            }
            topics {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const options = {
    hostname: 'api.producthunt.com',
    path: '/v2/api/graphql',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  
  const data = JSON.stringify({ query });
  
  try {
    const response = await httpRequest(options, data);
    if (response.data && response.data.posts) {
      const posts = response.data.posts.edges.map(edge => edge.node);
      console.log(`✅ 抓取到 ${posts.length} 个新产品`);
      return posts;
    } else {
      console.error('❌ 返回数据格式错误：', JSON.stringify(response).substring(0, 200));
      return [];
    }
  } catch (error) {
    console.error('❌ 抓取失败：', error.message);
    return [];
  }
}

// ===== 将ProductHunt产品转换为你的工具格式 =====
function convertToTools(productHuntPosts) {
  const tools = [];
  
  for (const post of productHuntPosts) {
    // 判断分类
    let category = CONFIG.defaultCategory;
    if (post.topics && post.topics.edges) {
      for (const topic of post.topics.edges) {
        const slug = topic.node.slug;
        if (CONFIG.categories[slug]) {
          category = CONFIG.categories[slug];
          break;
        }
      }
    }
    
    // 提取标签（最多3个）
    const tags = post.topics.edges
      .slice(0, 3)
      .map(t => t.node.name)
      .filter(t => t);
    
    // 计算评分（基于投票数）
    const rating = Math.min(5, (post.votesCount / 100) + 3.5).toFixed(1);
    
    tools.push({
      name: post.name,
      category: category,
      description: post.tagline || post.description || '一个创新的AI工具',
      url: post.website || post.url,
      rating: parseFloat(rating),
      votes: post.votesCount,
      tags: tags,
      source: 'producthunt',
      sourceId: post.id,
      createdAt: post.createdAt
    });
  }
  
  return tools;
}

// ===== 以下是你原有的函数（未改动）=====

// 从本地文件读取已有工具
function loadExistingTools() {
  try {
    const toolsPath = path.join(__dirname, 'data', 'tools.json');
    if (fs.existsSync(toolsPath)) {
      const data = fs.readFileSync(toolsPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('没有找到已有工具数据，将创建新数据');
  }
  return [];
}

// 保存工具数据到JSON文件
function saveTools(tools) {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const toolsPath = path.join(dataDir, 'tools.json');
  fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));
  console.log(`💾 工具数据已保存到 data/tools.json (共${tools.length}个工具)`);
}

// 合并新旧工具（去重）
function mergeTools(existingTools, newTools) {
  const toolMap = new Map();
  
  existingTools.forEach(tool => {
    toolMap.set(tool.name + '|' + tool.sourceId, tool);
  });
  
  let added = 0;
  newTools.forEach(tool => {
    const key = tool.name + '|' + tool.sourceId;
    if (!toolMap.has(key)) {
      toolMap.set(key, tool);
      added++;
    }
  });
  
  console.log(`✨ 新增 ${added} 个工具，去重后总数：${toolMap.size}`);
  return Array.from(toolMap.values());
}

// 生成SEO友好的页面（你原有的函数，完全保留）
function generateSEOPage(category, toolList) {
  const categoryNames = {
    'writing': '写作',
    'image': '图像',
    'video': '视频',
    'marketing': '营销'
  };
  
  const cnCategory = categoryNames[category] || category;
  
  // 按投票数排序
  const sortedTools = [...toolList].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  
  const toolsHTML = sortedTools.map(tool => `
    <div class="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h2 class="text-2xl font-semibold mb-2">${tool.name}</h2>
      <p class="text-gray-600 mb-4">${tool.description}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${tool.tags ? tool.tags.map(tag => `<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">${tag}</span>`).join('') : ''}
        ${tool.votes ? `<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">🔥 ${tool.votes} 票</span>` : ''}
      </div>
      <div class="flex items-center justify-between">
        <span class="text-yellow-500">⭐ ${tool.rating}</span>
        <a 
          href="${tool.affiliateUrl || tool.url}" 
          target="_blank" 
          rel="nofollow sponsored"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          访问官网
        </a>
      </div>
    </div>
  `).join('');

  return `// 由 OpenClaw 自动生成 - ${new Date().toISOString().split('T')[0]}
export const metadata = {
  title: '${new Date().getFullYear()}年最新AI${cnCategory}工具推荐',
  description: '实时从ProductHunt抓取最新AI${cnCategory}工具，包括${sortedTools.slice(0,3).map(t => t.name).join('、')}等。每日更新，发现创新产品。',
  keywords: 'AI${cnCategory}工具,${sortedTools.slice(0,5).map(t => t.name).join(',')},人工智能,${cnCategory}软件',
};

export default function ${category.charAt(0).toUpperCase() + category.slice(1)}Tools() {
  const tools = ${JSON.stringify(sortedTools, null, 2)};

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:text-blue-500">首页</a> &gt; 
        <a href="/tools" className="hover:text-blue-500">AI工具</a> &gt; 
        <span>AI${cnCategory}工具</span>
      </nav>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">最新AI${cnCategory}工具</h1>
        <div className="text-sm text-gray-400">
          最后更新：${new Date().toLocaleDateString('zh-CN')}
        </div>
      </div>
      
      <p className="text-xl text-gray-600 mb-8">
        我们从ProductHunt实时抓取了最新、最热门的AI${cnCategory}工具，共${sortedTools.length}款。
        每天更新，确保你第一时间发现创新产品。
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <a href="/tools/writing" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">✍️ 写作工具</a>
        <a href="/tools/image" className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100">🎨 图像工具</a>
        <a href="/tools/video" className="px-4 py-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100">🎬 视频工具</a>
        <a href="/tools/marketing" className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100">📊 营销工具</a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        ${toolsHTML}
      </div>

      <div className="mt-8 text-sm text-gray-400 text-center border-t pt-8">
        数据来源：ProductHunt API | 由OpenClaw自动抓取更新
      </div>
    </main>
  );
}`;
}

// ===== 主函数 =====
async function main() {
  try {
    // 1. 获取ProductHunt令牌
    const token = await getProductHuntToken();
    if (!token) {
      console.error('❌ 无法获取ProductHunt令牌，请检查API凭证');
      return;
    }
    
    // 2. 抓取最新产品
    const rawPosts = await fetchFromProductHunt(token);
    if (rawPosts.length === 0) {
      console.log('⚠️ 没有抓取到新工具');
      return;
    }
    
    // 3. 转换为工具格式
    const newTools = convertToTools(rawPosts);
    
    // 4. 加载已有工具
    const existingTools = loadExistingTools();
    
    // 5. 合并去重
    const allTools = mergeTools(existingTools, newTools);
    
    // 6. 按分类整理
    const categorized = allTools.reduce((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    }, {});
    
    console.log(`📊 工具分类：${Object.keys(categorized).join(', ')}`);
    
    // 7. 为每个分类生成页面
    let generatedCount = 0;
    for (const [category, toolList] of Object.entries(categorized)) {
      const filePath = path.join(__dirname, 'app', 'tools', category, 'page.tsx');
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      const content = generateSEOPage(category, toolList);
      fs.writeFileSync(filePath, content);
      console.log(`✅ 生成页面: app/tools/${category}/ (${toolList.length}个工具)`);
      generatedCount++;
    }
    
    // 8. 保存所有工具数据
    saveTools(allTools);
    
    console.log(`\n🎉 OpenClaw 真实API版工作完成！`);
    console.log(`📈 生成了 ${generatedCount} 个分类页面，共 ${allTools.length} 个工具`);
    console.log(`🌐 访问你的网站查看最新工具：`);
    console.log(`   https://www.aitoolguide.tech/tools/writing`);
    console.log(`   https://www.aitoolguide.tech/tools/image`);
    console.log(`   https://www.aitoolguide.tech/tools/video`);
    console.log(`   https://www.aitoolguide.tech/tools/marketing`);
    
  } catch (error) {
    console.error('❌ 运行出错：', error.message);
  }
}

// 执行主函数
main();
