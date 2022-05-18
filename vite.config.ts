import { defineConfig } from 'vite'
import path from 'path'

const resolvePath = (...args: string[]) => path.resolve(__dirname, ...args)

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolvePath('./src')
    }
  }
})
