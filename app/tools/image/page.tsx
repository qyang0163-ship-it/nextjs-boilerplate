// 由 OpenClaw 自动生成 - 2026-03-11
export default function ImageTools() {
  const tools = [
  {
    "name": "Midjourney",
    "category": "image",
    "description": "通过文字生成惊艳图片",
    "url": "https://www.midjourney.com",
    "rating": 4.8
  },
  {
    "name": "DALL-E 3",
    "category": "image",
    "description": "OpenAI开发的图像生成模型",
    "url": "https://openai.com/dall-e-3",
    "rating": 4.7
  },
  {
    "name": "Stable Diffusion",
    "category": "image",
    "description": "开源的AI图像生成器",
    "url": "https://stability.ai",
    "rating": 4.6
  }
];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">最好的AI 图像工具</h1>
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
}