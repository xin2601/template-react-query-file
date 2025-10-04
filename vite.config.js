import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
  // 路径别名配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 禁用开发环境的 PWA
  define: {
    __PWA_ENABLED__: false,
  },
  server: {
    // 确保开发服务器不启用 PWA 相关功能
    headers: {
      'Service-Worker-Allowed': '/',
    },
  },
})
