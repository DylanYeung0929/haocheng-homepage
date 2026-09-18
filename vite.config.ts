import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  // 本地联调：npm run dev 时 /api 转发到 npx wrangler dev（8788，模拟 KV）
  server: { proxy: { '/api': 'http://127.0.0.1:8788' } },
})
