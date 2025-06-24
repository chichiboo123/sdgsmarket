#!/usr/bin/env node

import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages용 빌드 설정
const buildConfig = {
  plugins: [
    (await import('@vitejs/plugin-react')).default(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : "/",
  define: {
    'process.env.GITHUB_REPOSITORY': JSON.stringify(process.env.GITHUB_REPOSITORY || ''),
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
};

try {
  console.log('GitHub Pages용 빌드를 시작합니다...');
  await build(buildConfig);
  console.log('빌드가 완료되었습니다!');
} catch (error) {
  console.error('빌드 중 오류가 발생했습니다:', error);
  process.exit(1);
}