// app/submit/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export const metadata = {
  title: '提交AI工具 - AI Tool Guide',
  description: '推荐你喜欢的AI工具，帮助更多人发现它',
};

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: 'writing',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以集成表单后端服务，例如 Formspree、Getform 等
    // 简单起见，我们只显示成功提示，实际可发邮件到你的邮箱
    console.log('提交的工具：', formData);
    setSubmitted(true);
    // 清空表单（可选）
    setFormData({ name: '', url: '', description: '', category: 'writing', email: '' });
  };

  if (submitted) {
    return (
      <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-4">提交成功！</h1>
          <p className="text-gray-600 mb-6">感谢你的推荐，我们会尽快审核并添加。</p>
          <Link href="/" className="text-blue-500 hover:underline">
            返回首页
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">提交AI工具</h1>
      <p className="text-gray-600 mb-8">
        推荐你喜欢的AI工具，帮助更多人发现它。提交后我们会尽快审核。
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">工具名称 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="例如：ChatGPT"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">官网地址 *</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">简短介绍 *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="用一两句话描述这个工具的用途和亮点"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">分类 *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="writing">写作工具</option>
            <option value="image">图像工具</option>
            <option value="video">视频工具</option>
            <option value="marketing">营销工具</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">你的邮箱（可选）</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="用于通知审核结果"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          提交工具
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-6 text-center">
        提交即表示你同意我们的服务条款和隐私政策。
      </p>
    </main>
  );
}
