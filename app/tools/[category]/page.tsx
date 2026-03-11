// 这是 tools/[category]/page.tsx 的内容
// 作用：作为所有AI工具分类页面的模板

interface Props {
  params: {
    category: string
  }
}

export default function ToolCategory({ params }: Props) {
  // 把URL里的 category（比如 "writing", "image"）转换成好看的中文标题
  const categoryNames: { [key: string]: string } = {
    'writing': 'AI写作工具',
    'image': 'AI图像生成',
    'video': 'AI视频创作',
    'marketing': 'AI营销工具'
  }

  const displayName = categoryNames[params.category] || 'AI工具'

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">最好的{displayName}</h1>
      <p className="text-xl text-gray-600 mb-8">
        发现并比较最流行的{displayName}，提高您的工作效率。
      </p>

      {/* OpenClaw未来会自动在这里生成工具列表 */}
      <div className="grid gap-6">
        {/* 这里的内容将由OpenClaw自动填充 */}
        <p className="text-gray-500">正在加载最新AI工具推荐...</p>
      </div>
    </main>
  )
}
