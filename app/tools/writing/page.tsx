// 由 OpenClaw 自动生成 - 2026-03-11
export default function WritingTools() {
  const tools = [
  {
    "name": "ChatGPT",
    "category": "writing",
    "description": "对话式AI，万能写作助手",
    "url": "https://chat.openai.com",
    "rating": 4.9
  },
  {
    "name": "Jasper",
    "category": "writing",
    "description": "AI营销文案撰写",
    "url": "https://www.jasper.ai",
    "rating": 4.7
  },
  {
    "name": "Copy.ai",
    "category": "writing",
    "description": "快速生成营销文案",
    "url": "https://www.copy.ai",
    "rating": 4.5
  }
];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">最好的AI 写作工具</h1>
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