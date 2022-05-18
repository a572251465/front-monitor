import { defineConfig } from 'vite'
import path from 'path'
import del from 'rollup-plugin-del'

const resolvePath = (...args: string[]) => path.resolve(__dirname, ...args)

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolvePath('./src')
    }
  },
  plugins: [del()],
  build: {
    lib: {
      entry: resolvePath('./src/core/index.ts'),
      formats: ['iife'],
      name: 'MonitorImpl',
      fileName: 'monitor.js'
    }
  }
})
