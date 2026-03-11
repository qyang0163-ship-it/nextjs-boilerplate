// app/page.tsx - 最简稳定版
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">AI Tool Guide</h1>
          <p className="text-2xl mb-8">发现全球最好的AI工具</p>
          <Link href="/tools/writing" className="bg-white text-blue-600 px-8 py-3 rounded-lg">
            开始浏览
          </Link>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">即将推出更多工具</h2>
        </div>
      </section>
    </main>
  );
}
