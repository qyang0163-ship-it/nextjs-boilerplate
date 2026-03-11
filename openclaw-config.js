// openclaw-config.js
// OpenClaw 配置文件

module.exports = {
  // 你的网站基本信息
  site: {
    name: 'AI Tool Guide',          // 你的网站名字
    url: 'https://aitoolguide.tech',  // ⚠️ 重要：改成你的真实网址
    description: '发现全球最好的AI工具'
  },

  // 告诉OpenClaw你的网站结构
  contentTypes: [
    {
      type: 'tool-category',         // 内容类型：工具分类页
      template: 'app/tools/[category]/page.tsx', // 模板位置
      sources: [
        // 告诉OpenClaw去哪里抓取AI工具信息
        { name: 'producthunt', enabled: true },   // 从ProductHunt找热门新产品
        { name: 'therundown', enabled: true }     // 从AI日报找工具
      ],
      schedule: '每天'               // 每天自动更新
    }
  ],

  // 赚钱相关设置（预留，非常重要！）
  monetization: {
    adsense: true,                   // 准备接入Google AdSense
    affiliate: ['openai', 'midjourney'] // 准备接入联盟营销
  }
}
