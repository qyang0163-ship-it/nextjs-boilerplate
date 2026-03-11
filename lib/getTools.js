// lib/getTools.js
import fs from 'fs';
import path from 'path';

export function getAllTools() {
  try {
    const toolsPath = path.join(process.cwd(), 'data', 'tools.json');
    if (fs.existsSync(toolsPath)) {
      const fileContents = fs.readFileSync(toolsPath, 'utf8');
      return JSON.parse(fileContents);
    }
  } catch (error) {
    console.error('读取工具数据失败：', error);
  }
  return [];
}

export function getLatestTools(limit = 6) {
  const allTools = getAllTools();
  // 按创建时间排序（假设有createdAt字段），取最新的
  const sorted = [...allTools].sort((a, b) => {
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
  return sorted.slice(0, limit);
}

export function getToolsByCategory(category) {
  const allTools = getAllTools();
  return allTools.filter(tool => tool.category === category);
}
